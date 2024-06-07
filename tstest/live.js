const HYPER = false;
const DEFROST_MIN = 12.0;
const DEFROST_MAX = 14.0;
const DOOR_OPEN_SHIFT = 2.0;
const MAX_CHANGE_PER_MINUTE = HYPER ? 100 : 0.5;
const DOOR_OPEN_CHANCE = HYPER ? 0.1 : 0.001;
const DOOR_OPEN_LENGTH_MAX = 5 * 60 * 1000;
const DEFROST_CHANCE = HYPER ? 0.1 : 0.00001;
const DEFROST_LENGTH_MAX = 60 * 60 * 1000;
const ALARM_CHANCE = HYPER ? 0.1 : 0.0001;
const ALARM_LENGTH_MAX = 5 * 60 * 1000;
// const FAN_CHANCE = HYPER ? 0.1 : 0.01;
// const FAN_LENGTH_MAX = 60 * 1000;

let temps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let tempRooms = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3];
let roomTargets = [-8, -10, -12, -10];
let roomDoorOpenTill = [undefined, undefined, undefined, undefined];
let roomDefrostTill = [undefined, undefined, undefined, undefined];
let alarmsTill = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
];
let fansTill = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
];
let lastRun = new Date().getTime();

function init(data) {
    for (let i = 0; i < 11; i++) {
        temps[i] = toI16(data.slaves[i + 1].regs["1h"].value) * 0.1;
    }
}

function step(data) {
    const now = new Date().getTime();
    const delta = (now - lastRun) / 1000 / 60;
    const maxTempChange = MAX_CHANGE_PER_MINUTE * delta;
    for (let i = 0; i < 11; i++) {
        const room = tempRooms[i];
        let targetMax = roomTargets[room];
        let targetMin = roomTargets[room] - 2;
        if (roomDefrostTill[tempRooms[i]]) {
            targetMin = DEFROST_MIN;
            targetMax = DEFROST_MAX;
        }
        const door = roomDoorOpenTill[room];
        if (door !== undefined && door > now) {
            targetMin += DOOR_OPEN_SHIFT;
            targetMax += DOOR_OPEN_SHIFT;
        }
        let tempChange = 0;
        if (temps[i] > targetMax) {
            tempChange = -(maxTempChange - Math.random() * 0.5 * maxTempChange);
        } else if (temps[i] < targetMin) {
            tempChange = maxTempChange - Math.random() * 0.5 * maxTempChange;
        } else {
            tempChange = maxTempChange * Math.random() * 2 - maxTempChange;
        }
        temps[i] += tempChange;
        data.slaves[i + 1].regs["1h"].value = fromI16(temps[i] / 0.1);
        data.slaves[i + 1].regs["3h"].value = roomDefrostTill[room] ? 0 : 1;
        data.slaves[i + 1].regs["4h"].value = roomDefrostTill[room] ? 1 : 0;

        const alarm = alarmsTill[i];
        if (alarm !== undefined && alarm < now) {
            alarmsTill[i] = undefined;
        }
        if (alarmsTill[i] === undefined && Math.random() < ALARM_CHANCE) {
            alarmsTill[i] = now + ALARM_LENGTH_MAX * Math.random();
        }
        data.slaves[i + 1].regs["5h"].value = alarmsTill[i] ? 1 : 0;
        data.slaves[i + 1].regs["6h"].value = temps[i] >= targetMax ? 1 : 0;
    }
    // console.log(temps);

    for (let room = 0; room < 4; room++) {
        const door = roomDoorOpenTill[room];
        if (door !== undefined && door < now) {
            roomDoorOpenTill[room] = undefined;
        }
        const hour = new Date().getHours();
        if (
            roomDoorOpenTill[room] === undefined &&
            hour > 8 &&
            hour < 17 &&
            Math.random() < DOOR_OPEN_CHANCE
        ) {
            roomDoorOpenTill[room] = now + DOOR_OPEN_LENGTH_MAX * Math.random();
        }
        data.slaves[room + 12].regs["1h"].value = roomDoorOpenTill[room] ? 1 : 0;

        const defrost = roomDefrostTill[room];
        if (defrost !== undefined && defrost < now) {
            roomDefrostTill[room] = undefined;
        }
        if (
            roomDefrostTill[room] === undefined &&
            (hour > 20 || hour < 4) &&
            Math.random() < DEFROST_CHANCE
        ) {
            roomDefrostTill[room] = now + DEFROST_LENGTH_MAX * Math.random();
        }
    }
    // console.log(roomDoorOpenTill);

    lastRun = now;
}

const toI16 = (v) => (v > 0x7fff ? v - 0x10000 : v);
const fromI16 = (v) => v & 0xffff;

module.exports = { PERIOD_MS: 1000, step, init };

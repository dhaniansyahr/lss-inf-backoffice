export function formatTime(time: string, separator: string = ":"): string {
    const [hours, minutes] = time.split(".");

    return hours + ":" + minutes;
}

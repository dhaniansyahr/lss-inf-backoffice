export function formatTime(time: string, separator: string = ":"): string {
    const [hours, minutes] = time.split(".");

    return hours + ":" + minutes;
}

export function formatEnumToTitleCase(enumValue: string): string {
    return enumValue
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

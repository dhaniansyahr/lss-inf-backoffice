export function formatTime(time: string): string {
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

// export function formattedFeatureData(data: TAllFeatures): TMappingAcl[] {
//     const formattedData: TMappingAcl[] = [];

//     Object.entries(data).forEach(([key, features]) => {
//         formattedData.push({
//             feature: key,
//             subFeature: features.map((feature) => ({
//                 name: feature.name,
//                 actions: feature.action.map((act) => act.name),
//             })),
//         });
//     });

//     return formattedData;
// }

// import { z } from "zod";

// export const schema = z.object({
//     roleName: z.string({ message: "Role Name harus diisi!" }).nonempty(),
//     permissions: z.array(
//         z.object({
//             subject: z.string({ message: "Subject harus diisi!" }).nonempty(),
//             action: z.array(
//                 z.string({ message: "Action harus diisi!" }).nonempty()
//             ),
//         })
//     ),
// });

// export type TAclRequest = z.infer<typeof schema>;

export type TAclRequest = {
    name: string;
    enabledFeatures: {
        [key: string]: boolean;
    };
};

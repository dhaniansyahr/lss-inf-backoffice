import { asistenLab } from "./asisten-lab/service.query";
import { auth } from "./auth";
import { jadwal } from "./jadwal/service.query";
import { dosen } from "./master-data/dosen/service.query";
import { matakuliah } from "./master-data/matakuliah/service.query";
import { ruangan } from "./master-data/ruangan/service.query";
import { shift } from "./master-data/shift/service.query";
import { roles } from "./pengguna/role/service.query";
import { users } from "./pengguna/users/service.query";

export const service = {
    auth,
    shift,
    ruangan,
    matakuliah,
    dosen,
    jadwal,
    asistenLab,
    users,
    roles,
};

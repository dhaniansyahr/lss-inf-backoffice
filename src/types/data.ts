export type TUser = {
    id: string;
    fullName: string;
    email: string;
    password: string;
    userLevelId: string;
    userLevel: TUserLevels;

    createdAt: Date;
    updatedAt: Date;
};

export type TUserLevels = {
    id: string;
    name: string;
    users: TUser[];
    acl: TAcl[];
    dosen: TDosen[];
    mahasiswa: TMahasiswa[];

    createdAt: Date;
    updatedAt: Date;
};

export type TAssignAccess = {
    featureName: string;
    actions: string[];
};

export type TFeatures = {
    id: string;
    name: string;
    actions: TActions[];
    acl: TAcl[];

    createdAt: Date;
    updatedAt: Date;
};

export type TActions = {
    id: string;
    name: string;
    featureId: string;
    feature: TFeatures;

    createdAt: Date;
    updatedAt: Date;
};

export type TAcl = {
    id: string;
    featureId: string;
    actionId: string;
    userLevelId: string;
    userLevel: TUserLevels;
    feature: TFeatures;

    createdAt: Date;
    updatedAt: Date;
};

export type TMatakuliah = {
    id: string;
    nama: string;
    kode: string;
    type: string;
    sks: number;
    bidangMinat: string;
    isTeori: boolean;
    semester: number;
    dosenPengampu: TDosenPengampuMK[];
    jadwal: TJadwal[];
    pendaftaranAsistenLab: TpendaftaranAsistenLab[];

    createdAt: Date;
    updatedAt: Date;
};

export type TDosen = {
    id: string;
    nama: string;
    email: string;
    password: string;
    nip: string;
    bidangMinat: string;
    userLevelId: string;
    userLevel: TUserLevels;
    dosenPengampu: TDosenPengampuMK[];
    jadwalDosen: TJadwalDosen[];
    absensi: TAbsensi[];

    createdAt: Date;
    updatedAt: Date;
};

export type TMahasiswa = {
    id: string;
    nama: string;
    npm: string;
    semester: number;
    password: string;
    tahunMasuk: number;
    isActive: boolean;
    userLevelId: string;
    userLevel: TUserLevels;
    jadwalMahasiswa: TJadwalMahasiswa[];
    absensi: TAbsensi[];
    pendaftaranAsistenLab: TpendaftaranAsistenLab[];
    asistenLab: TAsistenLab[];

    createdAt: Date;
    updatedAt: Date;
};

export type TDosenPengampuMK = {
    id: string;
    dosenId: string;
    matakuliahId: string;
    dosen: TDosen;
    matakuliah: TMatakuliah;

    createdAt: Date;
    updatedAt: Date;
};

export type TJadwalDosen = {
    id: string;
    jadwalId: string;
    dosenId: string;
    jadwal: TJadwal;
    dosen: TDosen;
};

export type TJadwalMahasiswa = {
    id: string;
    jadwalId: string;
    mahasiswaId: string;
    mahasiswa: TMahasiswa;
    jadwal: TJadwal;
};

export type TJadwalAsistenLab = {
    id: string;
    jadwalId: string;
    asistenLabId: string;
    asistenLab: TAsistenLab;
    jadwal: TJadwal;
};

export type TJadwal = {
    id: string;
    hari: string;
    shiftId: string;
    ruanganId: string;
    semester: string;
    tahun: string;
    isOverride: boolean;
    kelas?: string;
    matakuliahId: string;
    shift: TShift;
    ruangan: TRuanganLaboratorium;
    matakuliah: TMatakuliah;
    jadwalDosen: TJadwalDosen[];
    jadwalAsistenLab: TJadwalAsistenLab[];
    jadwalMahasiswa: TJadwalMahasiswa[];
    meetings: TMeeting[];
    pendaftaranAsistenLab: TpendaftaranAsistenLab[];
    overrideData: TOverrideJadwal[];

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};

export type TAsistenLab = {
    id: string;
    mahasiswaId: string;
    semester: number;
    tahun: string;
    mahasiswa: TMahasiswa;
    jadwalAsistenLab: TJadwalAsistenLab[];

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};

export type TpendaftaranAsistenLab = {
    id: string;
    mahasiswaId: string;
    jadwalId: string;
    nilaiTeori: string;
    nilaiPraktikum: string;
    nilaiAkhir: string;
    status: string;
    keterangan?: string;
    matakuliahId: string;
    mahasiswa: TMahasiswa;
    jadwal: TJadwal;
    matakuliah: TMatakuliah;

    createdAt: Date;
    updatedAt: Date;
};

export type TParticipant = {
    id: string;
    name: string;
    noIdentitas: string;
    type: "DOSEN" | "MAHASISWA" | "ASISTEN_LAB";
    meetings: TParticipantMeetings;
};

export type TParticipantMeetings = {
    pertemuan1Id: string;
    pertemuan1: boolean;
    pertemuan2Id: string;
    pertemuan2: boolean;
    pertemuan3Id: string;
    pertemuan3: boolean;
    pertemuan4Id: string;
    pertemuan4: boolean;
    pertemuan5Id: string;
    pertemuan5: boolean;
    pertemuan6Id: string;
    pertemuan6: boolean;
    pertemuan7Id: string;
    pertemuan7: boolean;
    pertemuan8Id: string;
    pertemuan8: boolean;
    pertemuan9Id: string;
    pertemuan9: boolean;
    pertemuan10Id: string;
    pertemuan10: boolean;
    pertemuan11Id: string;
    pertemuan11: boolean;
    pertemuan12Id: string;
    pertemuan12: boolean;
};

export type TListParticipants = {
    meetings: TMeeting[];
    participants: TParticipant[];
};

export type TOverrideJadwal = {
    id: string;
    jadwalId: string;
    message: string;
    jadwal: TJadwal;

    createdAt: Date;
    updatedAt: Date;
};

export type TMeeting = {
    id: string;
    jadwalId: string;
    tanggal: string;
    pertemuan: number;
    jadwal: TJadwal;
    absensi: TAbsensi[];

    createdAt: Date;
    updatedAt: Date;
};

export type TRuanganLaboratorium = {
    id: string;
    nama: string;
    lokasi: string;
    kepalaLabId?: string;
    kapasitas: number;
    isLab: boolean;
    isActive: boolean;
    kepalaLab?: TKepalaLab;
    historyKepalaLab: THistoryKepalaLab[];
    jadwal: TJadwal[];

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};

export type TKepalaLab = {
    id: string;
    nama: string;
    nip: string;
    ruanganLaboratorium: TRuanganLaboratorium[];
    historyKepalaLab: THistoryKepalaLab[];

    createdAt: Date;
    updatedAt: Date;
};

export type THistoryKepalaLab = {
    id: string;
    kepalaLabId: string;
    ruanganLabId: string;
    startDate: Date;
    endDate?: Date;
    kepalaLab: TKepalaLab;
    ruanganLab: TRuanganLaboratorium;

    createdAt: Date;
    updatedAt: Date;
};

export type TAbsensi = {
    id: string;
    mahasiswaId?: string;
    meetingId?: string;
    dosenId?: string;
    isPresent: boolean;
    keterangan?: string;
    waktuAbsen?: Date;
    mahasiswa?: TMahasiswa;
    meeting?: TMeeting;
    dosen?: TDosen;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};

export type TShift = {
    id: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    jadwal: TJadwal[];

    createdAt: Date;
    updatedAt: Date;
};

export type TAllFeatures = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    actions: {
        name: string;
    }[];
};

export type TAccess = {
    featureName: "JADWAL";
    actions: {
        VIEW: boolean;
        ASSIGN: boolean;
        CREATE: boolean;
        DELETE: boolean;
        UPDATE: boolean;
        BULK: boolean;
        ABSENT: boolean;
        ASSIGN_ASISTEN_LAB: boolean;
        ASSIGN_MAHASISWA: boolean;
        GENERATE: boolean;
        UPDATE_MEETING: boolean;
        ACCEPTED: boolean;
    };
};

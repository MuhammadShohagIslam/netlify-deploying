import { IProfile } from "types/profile.types";

export type FileUploadPropsType = {
    values: IProfile;
    setValues: React.Dispatch<React.SetStateAction<IProfile>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
};

// interface Film
export default interface Film {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    is_favorite: boolean;

}


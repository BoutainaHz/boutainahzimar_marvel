export default interface Comic {
    id: number;
    title: string;
    modified: string;
     thumbnail: {
        path: string;
        extension: string;
    };
}


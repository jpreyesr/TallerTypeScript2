export class Serie 
{
    id: number;
    name: string;
    channel: string;
    seasons: number;
    image: string;
    description: string;
    url: string;

    constructor(id: number, name: string, channel: string, seasons: number, image: string, description: string, url: string) 
    {
        this.id = id;
        this.name = name;
        this.channel = channel;
        this.seasons = seasons;
        this.image = image;
        this.description = description;
        this.url = url;
    }
}
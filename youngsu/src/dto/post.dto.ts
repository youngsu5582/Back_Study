
interface PostDto{
    title:string;
    content:string;
    hashtag:Array<string>;
    userId:number;
    date:Date;
    views:number;
    like_count:number;

}
export type{PostDto};
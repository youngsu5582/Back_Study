export async function parseCsv(file : string){
    var rows:string[] = file.split("\r\n");
    var result : string[] = [];
    console.log(file);
    var columns:string[]=[];
    for (var index in rows){
        var row = rows[index].split(',');
        if(index==='0'){columns = row;}
        else{
            const data : any = {};
            for (var colIndex in columns){
                data[columns[colIndex]] = row[colIndex];
            }
            result.push(data);
        }
    }
    return result;
}
export class Utils {
    static getDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const parsedDate = month < 10 ?
            `${year}-0${month}-${day} ${hour}:${minute}:${second}`
            :
            `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        return parsedDate;
    }
}
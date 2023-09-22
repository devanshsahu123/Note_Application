
export default function checkUrl(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return regex.test(url);
}

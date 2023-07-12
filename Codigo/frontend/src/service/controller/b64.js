export const b64Imgs = [];

export function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
         b64Imgs.push(reader.result);
    }

}

export const clearArray = () => {
    b64Imgs.forEach(() => b64Imgs.pop())
}

export const clickImg = () => {
    const data = event.target.src;

    let w = window.open('about:blank');
    let image = new Image();

    image.src = data;

    setTimeout(function(){
        w.document.write(image.outerHTML);
    }, 0);
}
type Dimensions = {
    width: number,
    height: number
}

export const useGetFileDimensions = () => {
    const getImageDimensions = (file: Blob): Promise<Dimensions> => {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onload = function() {
                const image = new Image();

                if(typeof reader.result === 'string') {
                    image.src = reader.result;
                
                    image.onload = function() {
                        resolve({
                            width: image.width,
                            height: image.height
                        });
                    }
                }
            }

            reader.readAsDataURL(file);
        });
    }

    return {
        getImageDimensions
    }
}
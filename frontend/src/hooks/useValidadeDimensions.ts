type Dimensions = {
    width: number,
    height: number
}

export const useValidateDimensions = (props: Dimensions) => {
    const { width, height } = props;

    const validate = (dimensions: Dimensions) => {
        const widthDimensionIsTheSame = dimensions.width === width;
        const heightDimensionIsTheSame = dimensions.height === height;

        return widthDimensionIsTheSame && heightDimensionIsTheSame ? true : false;
    }
    
    return {
        validate
    }
}
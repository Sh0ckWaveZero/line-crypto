export class LineService {

  createBubbleBox = (text: string = "", value: string = "", priceChangeColor: string = "#454545"): any => {
    return {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "text",
          text: `${text}`,
          size: "xs",
          color: "#8c8c8c",
          margin: "md",
          flex: 0,
          align: "start",
        },
        {
          type: "text",
          text: `${value}`,
          align: "end",
          size: "xs",
          color: `${priceChangeColor}`,
        },
      ],
      justifyContent: "space-between",
    }
  }

}

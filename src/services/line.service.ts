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

  goldBubble = (item: any) => {
    return [
      {
        "type": "bubble",
        "size": "mega",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "image",
                  "url": "https://images.unsplash.com/photo-1624365169364-0640dd10e180?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  "size": "full",
                  "aspectMode": "cover",
                  "aspectRatio": "150:196",
                  "gravity": "center",
                  "flex": 1
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "image",
                      "url": "https://images.unsplash.com/photo-1598561222812-63429c3eee2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
                      "size": "full",
                      "aspectMode": "cover",
                      "aspectRatio": "150:98",
                      "gravity": "center"
                    },
                    {
                      "type": "image",
                      "url": "https://images.unsplash.com/photo-1543699565-003b8adda5fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      "size": "full",
                      "aspectMode": "cover",
                      "aspectRatio": "150:98",
                      "gravity": "center"
                    }
                  ],
                  "flex": 1
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "new",
                      "size": "xs",
                      "color": "#ffffff",
                      "align": "center",
                      "gravity": "center"
                    }
                  ],
                  "backgroundColor": "#EC3D44",
                  "paddingAll": "2px",
                  "paddingStart": "4px",
                  "paddingEnd": "4px",
                  "flex": 0,
                  "position": "absolute",
                  "offsetStart": "18px",
                  "offsetTop": "18px",
                  "cornerRadius": "100px",
                  "width": "48px",
                  "height": "25px"
                }
              ]
            }
          ],
          "paddingAll": "0px"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "size": "xl",
                      "wrap": true,
                      "text": "Gold Price by GTA ",
                      "color": "#ffffff",
                      "weight": "bold"
                    }
                  ],
                  "spacing": "sm"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ทองคำแท่ง 96.5%",
                      "color": "#ffffff"
                    }
                  ],
                  "margin": "sm"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ขายออก",
                          "align": "start",
                          "color": "#ffffff",
                          "size": "xs"
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": `${item.barSell} บาท`,
                          "align": "end",
                          "color": `${item.barSellColor}`,
                          "size": "xs"
                        }
                      ]
                    }
                  ],
                  "paddingAll": "sm",
                  "backgroundColor": "#ffffff1A",
                  "cornerRadius": "sm",
                  "justifyContent": "space-around",
                  "margin": "xs"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": "รับซื้อ",
                          "align": "start",
                          "color": "#ffffff",
                          "size": "xs"
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": `${item.barBuy} บาท`,
                          "align": "end",
                          "color": `${item.barBuyColor}`,
                          "size": "xs"
                        }
                      ]
                    }
                  ],
                  "paddingAll": "sm",
                  "backgroundColor": "#ffffff1A",
                  "cornerRadius": "sm",
                  "margin": "xs",
                  "justifyContent": "space-around"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ทองรูปพรรณ 96.5%",
                      "color": "#ffffff"
                    }
                  ],
                  "margin": "sm"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ขายออก",
                          "align": "start",
                          "color": "#ffffff",
                          "size": "xs"
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": `${item.jewelrySell} บาท`,
                          "align": "end",
                          "color": `${item.jewelrySellColor}`,
                          "size": "xs"
                        }
                      ]
                    }
                  ],
                  "paddingAll": "sm",
                  "backgroundColor": "#ffffff1A",
                  "cornerRadius": "sm",
                  "justifyContent": "space-around",
                  "margin": "xs"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": "รับซื้อ",
                          "align": "start",
                          "color": "#ffffff",
                          "size": "xs"
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": `${item.jewelryBuy} บาท`,
                          "align": "end",
                          "color": `${item.jewelryBuyColor}`,
                          "size": "xs"
                        }
                      ]
                    }
                  ],
                  "paddingAll": "sm",
                  "backgroundColor": "#ffffff1A",
                  "cornerRadius": "sm",
                  "margin": "xs",
                  "justifyContent": "space-around"
                }
              ]
            }
          ],
          "paddingAll": "20px",
          "backgroundColor": "#464F69"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": `${item.lastUpdate}`,
              "color": "#ffffff",
              "size": "xs"
            }
          ],
          "backgroundColor": "#464F69"
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
    ]
  }
}

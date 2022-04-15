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

  gasBubble = (provider: string, item: any) => {

    let boxContents: any[] = [
      {
        "type": "text",
        "text": `${item.providerName}`,
        "size": "md",
        "weight": "bold"
      }
    ]

    item.gasPrice.forEach((element: any) => {
      boxContents.push(
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://img.icons8.com/external-flat-icons-pack-pongsakorn-tan/344/external-gas-intelligent-automotive-flat-icons-pack-pongsakorn-tan.png",
                  "offsetTop": "sm"
                },
                {
                  "type": "text",
                  "text": `${element.name}`,
                  "weight": "bold",
                  "margin": "xs",
                  "flex": 0,
                  "size": "xxs",
                  "style": "normal",
                  "gravity": "center",
                  "wrap": true
                },
                {
                  "type": "text",
                  "text": `${element.value} บาท`,
                  "size": "xxs",
                  "align": "end",
                  "color": "#aaaaaa"
                }
              ],
              "justifyContent": "center",
              "alignItems": "center"
            }
          ]
        }
      )
    });

    const logo = [
      {
        provider: "ptt",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/PTT-01.svg/1200px-PTT-01.svg.png"
      },
      {
        provider: "shell",
        url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Shell_logo.svg/1200px-Shell_logo.svg.png"
      },
      {
        provider: "esso",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Esso_textlogo.svg/1200px-Esso_textlogo.svg.png"
      },
      {
        provider: "caltex",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Caltex_brand_logo.svg/1200px-Caltex_brand_logo.svg.png"
      },
      {
        provider: "irpc",
        url: "https://www.logolynx.com/images/logolynx/a0/a02a324e481867f34c45ea34509cda65.jpeg"
      },
      {
        provider: "pt",
        url: "https://gsm.co.th/wp-content/uploads/2017/09/pt-logo.png"
      },
      {
        provider: "susco",
        url: "https://www.susco.co.th/images/logo_susco_large.png"
      },
      {
        provider: "pure",
        url: "https://shops-image.s3-ap-southeast-1.amazonaws.com/l/logothailand/img-lib/spd_20130825231513_b.jpg"
      }
    ]

    const logoUrl = logo
      .filter((element: any) => element.provider === provider)
      .map((element: any) => element.url)[0]

    console.log(logoUrl)

    const bubble = [
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": `${logoUrl}`,
          "size": "lg",
          "aspectMode": "fit"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": boxContents,
        },
        "styles": {
          "hero": {
            "backgroundColor": "#f8edeb"
          }
        }
      }
    ];
    return bubble;
  }
}

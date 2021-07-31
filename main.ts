/**
* LUMEX LDM 64*32 顯示器的函數
*/

//% weight=0 color=#ff9933 icon="\uf233" block="LDM64*32"
namespace LumexLDM6432 {

    let foreColor=111
    export enum fontSize {
        //% block="5*7"
        smallSize = 0x81,
        //% block="8*16"
        bigSize = 0x83
    }
    export enum showNow {
        //% block="now"
        yes = 0xd1,
        //% block="later"
        no = 0x00
    }
    export enum patternType {
        //% block="8*8"
        type1 = 0xc0,
        //% block="8*16"
        type2 = 0xc1,
        //% block="16*16"
        type3 = 0xc2,
        //% block="32*32"
        type4 = 0xc3
    }
    export enum positiveType {
        //% block="positive"
        type1 = 1,
        //% block="negative"
        type2 = 0
    }
    export enum filledType {
        //% block="no"
        type1 = 0,
        //% block="yes"
        type2 = 1
    }

    export enum transitionType {
        //% block="upward"
        type1 = 0,
        //% block="downward"
        type2 = 1,
        //% block="leftward"
        type3 = 2,
        //% block="rightward"
        type4 = 3
    }

    export enum moveType {
        //% block="inside out"
        type1 = 0,
        //% block="outside in"
        type2 = 1
    }

    export enum colorCode {
        //% block="black"
        color0 = 0,
        //% block="white"
        color111 = 111,
        //% block="red"
        color96 = 96,
        //% block="orange"
        color100 = 100,
        //% block="yellow"
        color108 = 108,
        //% block="green"
        color4 = 4,
        //% block="blue"
        color3 = 3,
        //% block="indigo"
        color66 = 66,
        //% block="purple"
        color99 = 99,
        //% block="dark red"
        color32 = 32,
        //% block="pink"
        color103 = 103,
        //% block="earth yellow"
        color104 = 104,
        //% block="lime"
        color12 = 12
    }

    export enum animationType {
        //% block="fly in and out upward"
        type1 = 2,
        //% block="fly in and out downward"
        type2 = 3,
        //% block="fly in and out leftward"
        type3 = 4,
        //% block="fly in and out rightward"
        type4 = 5,
        //% block="blink"
        type5 = 6,
        //% block="fly in downward"
        type6 = 7,
        //% block="fly in upward"
        type7 = 8,
        //% block="fly in rightward"
        type8 = 9,
        //% block="fly in leftward"
        type9 = 10,
        //% block="fly in down-rightward"
        type10 = 11,
        //% block="fly in down-leftward"
        type11 = 12,
        //% block="fly in up-rightward"
        type12 = 13,
        //% block="fly in up-leftward"
        type13 = 14,
        //% block="fly in from each direction"
        type14 = 15
    }
    
    export enum yesOrNo {
        //% block="yes"
        yes = 1,
        //% block="no"
        no = 0
    }

    export enum usrPatternType {
        //% block="5*5"
        type1 = 5,
        //% block="8*8"
        type2 = 8,
        //% block="12*12"
        type3 = 12,
        //% block="16*16"
        type4 = 16
    }

    export enum moveDirection {
        //% block="upward"        
        upward=32,
        //% block="downward" 
        downward=33,
        //% block="leftward" 
        leftward=34,
        //% block="rightward" 
        rightward=35
    }

    function convertNumToHexStr(myNum: number, digits: number): string {
        let tempDiv = 0
        let tempMod = 0
        let myStr = ""
        tempDiv = myNum
        while (tempDiv > 0) {
            tempMod = tempDiv % 16
            if (tempMod > 9) {
                myStr = String.fromCharCode(tempMod - 10 + 97) + myStr
            } else {
                myStr = tempMod + myStr
            }
            tempDiv = Math.idiv(tempDiv, 16)
        }
        while (myStr.length != digits) {
            myStr = "0" + myStr
        }
        return myStr
    }

    /**
     * Setup Lumex LDM6432 Tx Rx to micro:bit pins.
     * 設定Lumex LDM6432的Tx、Rx連接腳位
     * @param pinRX to pinRX ,eg: SerialPin.P1
     * @param pinTX to pinTX ,eg: SerialPin.P2
    */
    //% blockId="LDM_setSerial" block="set LDM RX(white wire) to %pinRX| TX(yellow wire) to %pinTX"
    //% weight=100 blockGap=10 blockInlineInputs=true
    export function LDM_setSerial(pinRX: SerialPin, pinTX: SerialPin): void {
        basic.pause(300)
        serial.redirect(
            pinRX,
            pinTX,
            BaudRate.BaudRate115200
        )
        //serial.readUntil("E")
        basic.pause(200)
        LDM_stopPages()
        LDM_setPatternOverlay(1)
    }

    //% blockId="LDM_clear" block="LDM clear"
    //% weight=98 blockGap=10
    export function LDM_clear(): void {
        serial.writeString("ATd0=()")
        serial.readUntil("E")
        basic.pause(20)
    }
    
    //% blockId="LDM_display" block="LDM display"
    //% weight=94 blockGap=10
    export function LDM_display(): void {
        serial.writeString("ATd1=()")
        serial.readUntil("E")
        basic.pause(20)
    }


    //% blockId="LDM_on" block="turn LDM on"
    //% weight=92 blockGap=10
    export function LDM_on(): void {
        serial.writeString("ATf1=()")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_off" block="turn LDM off"
    //% weight=90 blockGap=10
    export function LDM_off(): void {
        serial.writeString("ATf0=()")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_setBrightess" block="set LDM brightness(0~11) %brightness"
    //% weight=88 blockGap=10 brightness.min=0 brightness.max=11
    export function LDM_setBrightness(brightness: number): void {
        serial.writeString("ATf2=(" + brightness + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_displayFirmware"  block="display firmware Revision"
    //% weight=86 blockGap=10
    export function LDM_displayFirmware(): void {
        serial.writeString("AT20=()")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_ATcommand" block="execute AT command: %atCommand"
    //% weight=84 blockGap=10
    export function LDM_ATcommand(atCommand: string): void {
        serial.writeString(atCommand)
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_playPage1" block="display single page(0~6) stored in the LDM without animation: %myPage"
    //% weight=80 blockGap=10 blockInlineInputs=true myPage.min=0 myPage.max=6
    export function LDM_playPage1(myPage: number): void {
        serial.writeString("ATfc=(" + myPage + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_playPage2" block="display single page(0~6) stored in the LDM: %myPage|animation %effect|speed(1~10) %speed"
    //% weight=78 blockGap=10 blockInlineInputs=true myPage.min=0 myPage.max=6 effect.min=1 effect.max=15 speed.min=1 speed.max=10
    export function LDM_playPage2(myPage: number, effect: animationType, speed: number): void {
        serial.writeString("ATf2=(0)")
        serial.readUntil("E")
        basic.pause(20)
        //清掉特效
        serial.writeString("ATfd=(0)")
        serial.readUntil("E")
        basic.pause(20)
        //設定速度及特效
        serial.writeString("ATbf=(" + speed + ")")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATfc=(" + myPage + ")")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATfd=(" + effect + ")")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATf2=(11)")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_playPages" block="display multi pages stored in the LDM |number of pages(2~7) %pages|page interval period(1~10) %period|animation %effect|animation speed(1~10) %speed"
    //% weight=76 blockGap=10 blockInlineInputs=true pages.min=2 pages.max=7 effect.min=16 effect.max=30 period.min=1 period.max=10 speed.min=1 speed.max=10
    export function LDM_playPages(pages: number, period: number, effect: animationType, speed: number): void {
        //清掉特效
        serial.writeString("ATf2=(0)")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATfd=(0)")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATdf=(" + pages + ")")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATbe=(" + period + ")")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATbf=(" + speed + ")")
        serial.readUntil("E")
        basic.pause(20)
        if (effect > 1 && effect < 7)
            effect += 14
        else if (effect > 6 && effect < 16)
            effect += 15
        serial.writeString("ATfd=(" + effect + ")")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("ATf2=(11)")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_stopPages" block="stop display animation"
    //% weight=74 blockGap=10 blockInlineInputs=true
    export function LDM_stopPages(): void {
        serial.writeString("ATfd=(0)")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_saveToRom" block="write dipslay contents to current displayed EEPROM page address"
    //% weight=72 blockGap=10
    export function LDM_saveToRom(): void {
        serial.writeString("ATfe=()")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_putString" block="LDM put string: %myStr|size: %mySize|on line: %line|column: %column|color code(0~111): %color"
    //% weight=70 blockGap=10 blockInlineInputs=true line.min=0 line.max=3 column.min=0 column.max=19 color.min=0 color.max=111
    export function LDM_putString(myStr: string, mySize: fontSize, line: number, column: number, color: number): void {
        if (myStr.length > 0) {
            if(color!=foreColor){
                serial.writeString("ATef=(" + color + ")")
                serial.readUntil("E")
                basic.pause(20)
                foreColor=color
            }
            if (mySize == 0x81)
                serial.writeString("AT81=(" + line + "," + column + "," + myStr + ")")
            else if (mySize == 0x83)
                serial.writeString("AT83=(" + line + "," + column + "," + myStr + ")")
            serial.readUntil("E")
            basic.pause(20)
        }
    }



    //% blockId="LDM_getColor" block="color code %myColor"
    //% weight=68 blockGap=10
    export function LDM_getColor(myColor: colorCode): number {
        return myColor
    }
 
    //% blockId="LDM_setBackColor" block="set LDM background color %backColor"
    //% weight=66 blockGap=10 backColor.min=0 backcolor.max=111 
    export function LDM_setBackColor(backColor: number): void {
        serial.writeString("ATec=(" + backColor + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_changeColor" block="swap displayed color from color %color1| to color %color2"
    //% weight=65 blockGap=10 color1.min=0 color1.max=111 color2.min=0 color2.max=111
    export function LDM_changeColor(color1: number, color2: number): void {
        serial.writeString("ATcc=(" + color1 + "," + color2 + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_changeColorArea" block="swap displayed color in the area:|x for the top left corner:%x|y for the top left corner:%y|width:%width|height:%height|from color %color1| to color %color2"
    //% weight=64 blockGap=10 color1.min=0 color1.max=111 color2.min=0 color2.max=111 x.min=0 x.max=63 y.min=0 y.max=31 width.min=1 width.max=64 height.min=1 height.max=32
    export function LDM_changeColorArea(x: number, y: number, width:number, height:number, color1:number, color2:number): void {
        serial.writeString("ATcf=("+x+","+y+","+width+","+height+"," + color1 + "," + color2 + ")")
        serial.readUntil("E")
        basic.pause(20)
    }


    //% blockId="LDM_setXYcolor" block="set the color code %color| to X: %x| Y: %y"
    //% weight=62 blockGap=10 color.min=0 color.max=111 x.min=0 x.max=63 y.min=0 y.max=31
    export function LDM_setXYcolor(color: number, x: number, y: number): void {
        serial.writeString("ATee=(" + x + "," + y + "," + color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }


    //% blockId="LDM_changeToOneColor" block="change color of all pixels except the black color pixels to color code %color"
    //% weight=60 blockGap=10 color.min=0 color.max=111
    export function LDM_changeToOneColor(color: number): void {
        serial.writeString("ATc0=(" +color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }


    //% blockId="LDM_drawLine" block="draw a line|first point X %x0|first point Y %y0|second point X %x1|second point Y %y1|color code(0~111) %color"
    //% weight=100 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 x1.min=0 x1.max=63 y1.min=0 y1.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawLine(x0: number, y0: number, x1: number, y1: number, color: number): void {
        serial.writeString("AT90=(" + x0 + "," + y0 + "," + x1 + "," + y1 + "," + color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_drawRectangle" block="draw a rectangle|filled %myFilled|up left corner X %x0|up left corner Y %y0|bottom right corner X %x1|bottom right corner Y %y1|color code(0~111) %color"
    //% weight=98 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 x1.min=0 x1.max=63 y1.min=0 y1.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawRectangle(myFilled: filledType, x0: number, y0: number, x1: number, y1: number, color: number): void {
        if (myFilled == 0)
            serial.writeString("AT91=(" + x0 + "," + y0 + "," + x1 + "," + y1 + "," + color + ")")
        else
            serial.writeString("AT92=(" + x0 + "," + y0 + "," + x1 + "," + y1 + "," + color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_drawCircle" block="draw a circle|filled %myFilled|center X %x0|center Y %y0|radius %radius|color code(0~111) %color"
    //% weight=96 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawCircle(myFilled: filledType, x0: number, y0: number, radius: number, color: number): void {
        if (myFilled == 0)
            serial.writeString("AT94=(" + x0 + "," + y0 + "," + radius + "," + color + ")")
        else
            serial.writeString("AT95=(" + x0 + "," + y0 + "," + radius + "," + color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_drawSquare" block="draw a square|up left corner X %x0|up left corner Y %y0|width %width|color code(0~111) %color"
    //% weight=94 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawSquare(x0: number, y0: number, width: number, color: number): void {
        serial.writeString("AT93=(" + x0 + "," + y0 + "," + width + "," + color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_setPixel" block="draw a pixel|X %x0|Y %y0|color code(0~111) %color"
    //% weight=92 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_setPixel(x0: number, y0: number, color: number): void {
        serial.writeString("ATef=(" + color + ")")
        serial.readUntil("E")
        basic.pause(20)
        serial.writeString("AT9e=(" + x0 + "," + y0 + ")")
        serial.readUntil("E")
        basic.pause(20)
    }
    
    //% blockId="LDM_setScroll" block="scroll the whole display %transition|shift time(1~200ms) %time"
    //% weight=80 blockGap=10 blockInlineInputs=true time.min=1 time.max=200 advanced=true
    export function LDM_setScroll(transition: transitionType, time: number): void {
        if (time < 1)
            time = 1
        if (time > 200)
            time = 200
        serial.writeString("AT" + convertNumToHexStr(transition + 0xd2, 2) + "=(" + time + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_eraseImageInOut" block="erase the whole display %myMove|shift time(1~200ms) %time"
    //% weight=78 blockGap=10 time.min=1 time.max=200 blockInlineInputs=true advanced=true
    export function LDM_eraseImageInOut(myMove: moveType, time: number): void {
        serial.writeString("AT" + convertNumToHexStr(myMove + 0xaa, 2) + "=(" + time + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_showImageInOut" block="display the whole display %myMove|shift time(1~200ms) %time"
    //% weight=76 blockGap=10 time.min=1 time.max=200 blockInlineInputs=true advanced=true
    export function LDM_showImageInOut(myMove: moveType, time: number): void {
        serial.writeString("AT" + convertNumToHexStr(myMove + 0xa8, 2) + "=(" + time + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_saveDisplayed" block="save the whole display contents to RAM"
    //% weight=60 blockGap=10 advanced=true
    export function LDM_saveDisplayed(): void {
        serial.writeString("AT2c=()")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_loadDisplayed" block="load and show the whole display contents from RAM"
    //% weight=58 blockGap=10 advanced=true
    export function LDM_loadDisplayed(): void {
        serial.writeString("AT2d=()")
        serial.readUntil("E")
        basic.pause(20)
    }
    //% blockId="LDM_setPatternOverlay" block="set pattern overlay on background: %myAns"
    //% weight=56 blockGap=10 advanced=true
    export function LDM_setPatternOverlay(myAns:yesOrNo): void {
        if (myAns==1)
            serial.writeString("AT2b=(0)")
        else
            serial.writeString("AT2b=(1)")
        serial.readUntil("E")
        basic.pause(10)
    }

    //% blockId="LDM_loadPattern" block="load user pattern from EEPROM|pattern type:%myPattern|Pattern ID: %myID to |X:%x|Y:%y|display now %show"
    //% weight=54 blockGap=10 x.min=0 x.max=63 y.min=0 y.max=31 myID.min=0 myID.max=24 advanced=true
    export function LDM_loadPattern(myPattern: usrPatternType, myID: number, x: number, y: number, show: yesOrNo): void {
        let myStr = "AT29=("
        if (show == 0)
            myStr = "AT2e=("
        serial.writeString(myStr + x + "," + y + "," + myPattern + "," + myPattern + "," + myID + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_movePattern" block="move user pattern 1 pixel %myDir|pattern type:%myPattern|Pattern ID: %myID"
    //% weight=52 blockGap=10 myID.min=0 myID.max=24 advanced=true
    export function LDM_movePattern(myDir :moveDirection,myPattern: usrPatternType, myID: number): void {
        serial.writeString("AT"+myDir+"=(" +myPattern + "," + myPattern + "," + myID + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_showAll" block="Display the multi patterns in the same time"
    //% weight=50 blockGap=10 advanced=true
    export function LDM_showAll(): void {
        serial.writeString("AT2f=()")
        serial.readUntil("E")
        basic.pause(20)
    }

}

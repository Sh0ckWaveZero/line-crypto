export function getConsolation() {
  const consolation = [
    "ฉันอาจจะไม่เข้าใจเธอ แต่ฉันจะอยู่ข้างๆ เธอนะ 🤍",
    "เธอยังมีเวลาอีกมาก และฉันจะอยู่ข้างๆ เผื่อว่าจะช่วยอะไรเธอได้บ้าง 🤍",
    "เราอยู่ตรงนี้แล้ว มีอะไรระบายมาได้เลย",
    "ใครทำอะไรก็ได้อย่างนั้นแหละ คนแย่ๆ แบบนั้นสักวันก็ต้องได้รับบทเรียน เชื่อเถอะ",
    "วันนี้อาจจะเหนื่อย และมีเรื่องให้ต้องทุกข์ใจเยอะ ตอนนี้เรามาพักสักหน่อยกันเถอะ",
    "มันไม่สายเกินไปหรอกถ้าจะเริ่มต้นใหม่อีกครั้ง",
    "เมื่อไหร่ที่คุณสามารถปล่อยอดีตให้ผ่านไปได้ สิ่งที่ดียิ่งกว่าจะตามมาแน่นอน",
    "ไม่ต้องเสียใจหรอก เพราะเธอทำดีที่สุดแล้ว",
    "เราไม่รู้ว่าวันนี้เธอเจออะไรมา แต่วันนี้เธอยังมีเราอยู่นะ",
    "ช่วงเวลาดีๆ จะกลายเป็นความทรงจำที่ดี และช่วงเวลาแย่ๆ จะกลายเป็นบทเรียนที่ดี",
    "ไม่เป็นไรหรอกนะ หาใหม่ได้ คนดีๆ ยังรอให้เราออกไปเจออีกเยอะ",
    "วันพรุ่งนี้ ทุกอย่างจะต้องดีขึ้นแน่นอน",
    "ค่อยเป็นค่อยไป อย่าเพิ่งคิดอะไรไปไกล อดทนเข้าไว้อาทิตย์ต่อไปจะเป็นยังไงก็ช่าง วันนี้สนใจแค่ว่าอะไรทำให้เรารู้สึกดีขึ้นได้ก็พอ",
    "ถ้าเรารู้จักเรียนรู้จากสิ่งที่เกิดขึ้น มันก็จะช่วยให้เราเลี่ยงที่จะต้องเจอกับคนหรือเหตุการณ์ซ้ำเดิมได้นะ เห็นมั้ยล่ะอย่างน้อยเราก็ไม่ได้เสียเวลาทั้งหมดไปโดยเปล่าประโยชน์",
    "เวลาจะเยียวยาทุกอย่าง เธออาจรู้สึกแย่ โคตรจะแย่ แต่เดี๋ยวมันก็จะผ่านไปเป็นแค่อดีต",
    "ฉันเข้าใจความรู้สึกของเธอนะ ฉันรู้ว่าตอนนี้เธอคงรู้สึกแย่เอามากๆ ถ้ามีอะไรที่ฉันพอจะช่วยได้ก็บอกมาได้เลยนะ",
    "เสียใจ คือเสียใจ ไม่ไหว คือไม่ไหว แค่ยอมรับความอ่อนแอของตัวเองได้ก็เหมือนเราเข้มแข็งไปแล้วกว่าครึ่ง",
    'อย่าสูญเสีย "ตัวตน" เพราะขี้ปากของคนที่ไม่รู้จัก "ตัวคุณ"',
    "คุณค่าของความรักไม่มีวันสูญสลาย ยอมรับเถอะว่าการจากลานั้นเศร้าและเจ็บปวดเสมอ แต่จุดสิ้นสุด บางครั้งก็เป็นจุดเริ่มต้นของอะไรบางอย่างนะ",
    "คนเราไม่อาจกลับไปแก้ไขอดีต ที่ทำได้คือ การเรียนรู้จากมัน และไม่ทำมันอีก",
    "เป็นธรรมดาที่ช่วงหนึ่งของชีวิตที่เราจะรู้สึกแย่ แต่ขออย่าท้อแท้เพราะคงไม่มีใครที่จะแพ้ได้ทุกวัน",
    "เข้มแข็งไว้นะ",
    "อดีตอาจทำให้เจ็บปวด แต่คุณสามารถเลือกได้ว่าจะวิ่งหนี…หรือเรียนรู้จากมัน",
  ];
  const randomIndex = Math.floor(Math.random() * consolation.length - 1);
  return consolation[randomIndex];
}

export function randomLoginImage() {
  const url = [
    "https://images.unsplash.com/photo-1572782992110-afab5a6ef870?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1550527882-b71dea5f8089?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1562770584-eaf50b017307?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1602&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    "https://images.unsplash.com/photo-1584045446619-7146285c9811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1623241468000-e688e8ff4e02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1553386323-60698d6f7325?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1632849369576-06cb097fe68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
    "https://images.unsplash.com/photo-1590393654513-897773df2125?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1060&q=80",
    "https://images.unsplash.com/photo-1584985429926-08867327d3a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    "https://images.unsplash.com/photo-1564691038808-85233054b622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1633158829799-96bb13cab779?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1570053925584-b01273e1d656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1564690765900-a5f34b01ca88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1572019356778-10ea6db2474f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1609587415882-97552f39c6c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    "https://images.unsplash.com/photo-1619634912816-8e6ab3b7d176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    "https://images.unsplash.com/photo-1627923605750-d1b949006f96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  ];
  const randomIndex = Math.floor(Math.random() * url.length - 1);
  return url[randomIndex];
}

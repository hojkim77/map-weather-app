//import './App.css';
import React, {useState} from 'react';
import styled from 'styled-components';
import {useInterval} from "react-use";

function ShitRain() {
  const [emojisToRender, setEmojisToRender] = useState([{offset: 0, key: 0, emoji: ''}]);
  useInterval(() => { // 렌더링 돼서 아래 return문 즉 map 을 계속 호출함. 즉, push될때마다 다시 map 호출
    if (emojisToRender.length > 20) { // 이게 0.1초마다 push 돼서 쌓이면 20개 이상 쌓이면 shift(pop) 하는거인듯
      emojisToRender.shift();
    }

    const offset = Math.floor(Math.random() * 1000);
    const key = offset + Math.random() * 1000000;
    const emoji = 'ㅣ';

    emojisToRender.push({offset, key, emoji});

    setEmojisToRender([...emojisToRender]);
  }, 100); // 따라서 위의 주석과 이 줄의 시간을 적절하게 배치해야 자연스러운 효과를 낼 수 있다.
  return (
    <SuperContainer>
      {emojisToRender.map(({key, emoji, offset}) => { //key를 줬기 때문에 이미 떨어지고 있는건 그대로 떨어지고 바뀌거나 추가된 key만 추가로 적용
        console.log(emojisToRender)
        return (
          <EmojiContainer key={key} offset={offset}> 
            {emoji}
          </EmojiContainer>
        );
      })}
    </SuperContainer>
  );
}

function Rainy() {
  return (
    <>
      <ShitRain/>
    </>
  );
}

export default Rainy;

const SuperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const EmojiContainer = styled.div`
  @keyframes falldown {
    0% { margin-top: 0; }
    100% { margin-top: 600px; }
  }
  
  position: absolute;
  top: 80px;
  left: ${props => props.offset + 200}px;
  
  font-size: 36px;
  animation-name: falldown;
  animation-duration: 4s;
`;
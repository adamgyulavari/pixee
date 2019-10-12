// Import React
import React, { useState, useEffect } from 'react';
import { StyleSheet as Aphrodite } from 'aphrodite/no-important';

// Import Spectacle Core tags
import {
  Heading,
  Image,
  Slide,
  GoToAction,
  Text,
} from 'spectacle';

const { StyleSheet, css } = Aphrodite.extend([{
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
    if (selector[0] === ' ') {
      const tag = selector.slice(1);
      const nestedTag = generateSubtreeStyles(`${baseSelector} ${tag}`);
      return nestedTag;
    } else if (selector[0] === '>') {
      const tag = selector.slice(1);
      const nestedTag = generateSubtreeStyles(`${baseSelector} > ${tag}`);
      return nestedTag;
    }
    return null;
  }
}]);

const styles = StyleSheet.create({
  slide: {
    maxHeight: 900
  },
  answerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  answer: {
    flexShrink: 1,
    flexGrow: 1,
    padding: '20px',
    flexBasis: '48%',
    marginLeft: '1%',
    marginTop: '1%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  answerText: {
    margin: 0
  },
  content: {
    maxHeight: 450,
    display: 'flex',
    ' img:not(.tick)': {
      maxHeight: 450,
      width: 'auto',
      objectFit: 'contain'
    }
  },
  red: {
    background: '#e6194b'
  },
  orange: {
    background: '#f58231'
  },
  green: {
    background: '#3cb44b'
  },
  blue: {
    background: '#4363d8'
  },
  timer: {
    width: '0%',
    height: '20px',
    background: '#3cb44b'
  },
  faded: {
    opacity: 0.6
  }
});

const timerKeyFrames = {
  '0%': {
    background: '#3cb44b',
    width: '100%'
  },
  '50%': {
    background: '#ffe119',
    width: '50%'
  },
  '100%': {
    background: '#e6194b',
    width: '0%'
  }
};

const colors = [styles.red, styles.green, styles.blue, styles.orange];

export default (props) => {
  const {question, answers, correct, time, children, titleProps, ...slideProps} = props;
  
  const [clicked, setClicked] = useState(-1);
  
  useEffect(() => {
    setTimeout(() => {
      setClicked(correct)
      //spectacleGoto(2)
    }, time * 1000)
  })

  const timerStyle = StyleSheet.create({
    anim: {
        animationName: timerKeyFrames,
        animationDuration: `${time}s`,
        animationTimingFunction: 'linear'
      },
  });

  const titleDefaults = {size: 1, fit: true, caps: true, lineHeight: 1, textColor: 'secondary'}

  let spectacleGoto;

  return (
    <Slide className={css(styles.slide)} {...slideProps}>
      <GoToAction
        render={goToSlide => {
          spectacleGoto = goToSlide;
          return null;
        }}
      />
      <Heading {...{...titleDefaults, ...titleProps}}>
        {question}
      </Heading>
      <div className={css(styles.timer, timerStyle.anim)}>

      </div>
      <div className={css(styles.content)}>
        {children}
      </div>
      <div className={css(styles.answerContainer)}>
        {answers.map((answer, index) => (
          <div key={index}
               className={css(styles.answer, colors[index % colors.length], clicked !== -1 && index !== clicked && styles.faded)}
               onClick={() => setClicked(index)} >
            {index === clicked && <Image src='./assets/tick.svg' width="50px" className='tick' margin='0' />}
            <Text textColor="primary" size={1} bold margin='10px'>
              {answer}
            </Text>
          </div>
        ))}
      </div>
    </Slide>
  )
}

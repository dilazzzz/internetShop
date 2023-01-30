import React, {useState} from "react";
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useDispatch} from "react-redux";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const App = () => {

    const [open, setOpen] = React.useState(false);
    const [correct, setCorrect] = useState('')
    const [addCorrect, setAddCorrect] = useState('')
    const [step, setStep] = useState(0)
    const [ques, setQues] = useState([
        {text: 'Саша гомосек?', id: 0, ans: true},
        {text: 'Тема гомосек?', id: 1, ans: true},
        {text: 'Лена гомосек?', id: 2, ans: false}
    ])
    const [addQues, setAddQues] = useState([
        {text: 'Саша боб?', id: null, ans: false},
        {text: 'Тема боб?', id: null, ans: false},
        {text: 'Лена боб?', id: null, ans: true}
    ])

    const handleOpen = () => {
        setOpen(true)
        setStep(0)
    }
    const handleClose = () => setOpen(false);

    const checkAnswer = (sss) => {
        if (sss === ques[step].ans){
            setCorrect('Правильно, Молодец!')
            setAddCorrect('')
        } else if (sss === addQues[step].id) {
            setCorrect('Дополнительный вопрос:')
        } else {
            setCorrect('Неправильно, Лох!')
            setAddCorrect('')
        }
    }

    const checkAddAnswer = (sss) => {
        if (sss === addQues[step].ans){
            setAddCorrect('Правильно, Молодец!')
        } else {
            setAddCorrect('Неправильно, Лох!')
        }
    }
    const nextQues = () => {
        setCorrect('')
        setAddCorrect('')
        setStep(step + 1)
        if (step > 2) {
            setStep(0)
        }
    }

    const prevQue = () => {
        setStep(step - 1)
    }

    return (
            <div className="App">
                <Button
                    variant={"contained"}
                    onClick={handleOpen}
                >Пройти тест</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2 style={{color: "white"}}>
                            { step >= 3 ?
                                'Конец!'
                                :
                                ques[step].text
                            }
                        </h2>
                        {step >= 3 ?
                            <Button
                                variant={"contained"}
                                onClick={() => setStep(0)}
                            >Начать заного</Button>
                            :
                            <>
                                <Button
                                    color={"error"}
                                    variant={"contained"}
                                    style={{width: 50, marginTop: 10}}
                                    onClick={() => checkAnswer(true)}
                                >Да</Button>
                                <Button
                                    color={"success"}
                                    variant={"contained"}
                                    style={{width: 50, marginTop: 10}}
                                    onClick={() => checkAnswer(false)}
                                >Нет</Button>
                                <Button
                                    color={"secondary"}
                                    variant={"contained"}
                                    style={{width: 50, marginTop: 10}}
                                    onClick={() => checkAnswer(null)}
                                >Хз</Button>
                            </>
                        }
                        {!!correct && <h2 style={{color: "white"}}>{correct}</h2>}
                        {correct === 'Дополнительный вопрос:' &&
                            <>
                                <h2 style={{color: "white"}}>{addQues[step].text}</h2>
                                <Button
                                    color={"error"}
                                    variant={"contained"}
                                    style={{width: 50, marginTop: 10}}
                                    onClick={() => checkAddAnswer(true)}
                                >Да</Button>
                                <Button
                                    color={"success"}
                                    variant={"contained"}
                                    style={{width: 50, marginTop: 10}}
                                    onClick={() => checkAddAnswer(false)}
                                >Нет</Button>
                            </>
                        }
                        {!!addCorrect && <h2 style={{color: "white"}}>{addCorrect}</h2>}
                        <div style={{display: 'flex', marginTop: 30}}>
                            { step > 0 ?
                                <Button
                                    variant={"contained"}
                                    color={"secondary"}
                                    onClick={() => prevQue()}
                                >Назад</Button>
                                :
                                ''
                            }
                            { correct && correct !== 'Дополнительный вопрос:'?
                                <Button
                                    onClick={() => nextQues()}
                                    variant={"contained"}
                                >Следующий вопрос</Button>
                                :
                                addCorrect ?
                                    <Button
                                        onClick={() => nextQues()}
                                        variant={"contained"}
                                    >Следующий вопрос</Button>
                                    :
                                    ''
                            }
                        </div>
                    </Box>
                </Modal>
            </div>
         )
}

export default App;

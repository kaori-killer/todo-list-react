import { useState } from 'react'

import MyHeader  from '../components/MyHeader';
import MyButton from '../components/MyButton';
import getStringDate from '../util/date';

const Home = () => {

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = getStringDate(curDate);

    const decreaseDate = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()-1)
        );
    }

    const increaseDate = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()+1)
        );
    }

    return (
        <div>
            <MyHeader 
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseDate} />}
                rightChild={<MyButton text={">"} onClick={increaseDate} />}
            />
        </div>
    );
}

export default Home;
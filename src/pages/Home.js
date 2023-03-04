import { useState } from 'react'

import MyHeader  from '../components/MyHeader';
import MyButton from '../components/MyButton';
import getStringDate from '../util/date';

const Home = () => {

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = getStringDate(curDate);


    return (
        <div>
            <MyHeader 
                headText={headText}
                leftChild={"<"}
                rightChild={">"}
            />
        </div>
    );
}

export default Home;
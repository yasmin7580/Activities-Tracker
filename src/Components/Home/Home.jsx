import React from 'react';
import TaskForm from './TaskForm';
import AllActivities from './AllActivities';

const Home = () => {
    return (
        <div>
            <div className='fixed bottom-0 w-full border p-5 bg-black'>hello</div>
            <TaskForm></TaskForm>
            <hr />
            <AllActivities></AllActivities>
        </div>
    );
};

export default Home;
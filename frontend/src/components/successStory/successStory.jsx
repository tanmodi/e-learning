import React from 'react';
import './successStory.css';

const successStory = () => {
    const successStoryData = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Student',
            message:
                'This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.',
            image: 'https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'Student',
            message:
                "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
            image: 'https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        },
        {
            id: 3,
            name: 'John Doe',
            position: 'Student',
            message:
                'This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.',
            image: 'https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
        },
        {
            id: 4,
            name: 'Jane Smith',
            position: 'Student',
            message:
                "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
            image: 'https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        },
    ];
    return (
        <section className="successStory">
            <h2>What our students say</h2>
            <div className="successStory-cards">
                {successStoryData.map((story) => (
                    <div className="successStory-card" key={story.id}>
                        <div className="student-image">
                            <img src={story.image} alt={story.name} />

                        </div>
                        <p className="message">{story.message}</p>
                        <div className="info">
                            <p className='name'>{story.name}</p>
                            <p className='position'>{story.position}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default successStory;

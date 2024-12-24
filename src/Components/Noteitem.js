import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid veniam libero voluptas quis placeat natus vero sint quibusdam dolorem dolores quia, praesentium reprehenderit eius consectetur architecto ipsa fugiat deserunt ducimus explicabo labore nulla dolore assumenda sequi. In?</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem

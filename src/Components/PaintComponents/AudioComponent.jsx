import React , {useEffect, useRef} from 'react'

function AudioComponent({peerid,setAudioref}) {
    const AudioRef = useRef(null)
    useEffect(() =>{
        setAudioref(peerid,AudioRef)
    },[])
    return (
        <div>
            <audio ref={AudioRef} controls volume="true" autoPlay></audio>
        </div>
    )
}

export default AudioComponent

// TwitterContainer.js
import React, { useEffect } from 'react';
import { ITwitterProps } from '../types/types';

const TwitterFeed = (props: ITwitterProps) => {

    const { profileUrl } = props

    useEffect(() => {
        const anchor = document.createElement('a');
        anchor.setAttribute('class', 'twitter-timeline');
        anchor.setAttribute('data-theme', 'light');
        anchor.setAttribute('data-chrome', 'transparent noheader nofooter noborders');
        anchor.setAttribute('href', profileUrl);
        document.getElementsByClassName('twitter-embed')[0].appendChild(anchor);

        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        document.getElementsByClassName('twitter-embed')[0].appendChild(script);
    });

    return (
        <section className='twitterContainer'>
            <div className='twitter-embed'></div>
        </section>
    );
};

export default TwitterFeed;
import Jeffrey from './Jeffrey.png'
import Ishtahad from './Ishtahad.png'
import Daniel from './Daniel.png'
import Qiao from './Qiao.png'
import Github from './github.png'
import LinkedIn from './LinkedIn.png'
import './AboutUs.css'

function AboutUs() {
    return (
        <div className="about-us-container">
            <h1 className='title-about-us'>About Us</h1>
            <ul>
                <div className="about-us-person" id="Jeffrey">
                    <img id='profile-pic-about-us' src={Jeffrey} />
                    <div className='about-us-info'>
                        <p className='about-us-name'>Jeffrey Cheng</p>
                        <p className='about-us-title'>Team Lead</p>
                        <p>I'm Jeffrey, etc.</p>
                        <div className="Job-Links">
                            <a href='https://github.com/jeffreych6'><img className="Github" src={Github} /></a>
                            <a href='https://github.com/jeffreych6'><img className="LinkedIn" src={LinkedIn} /></a>
                            <div id='project-links'>
                                <p>Other projects:</p>
                                <a href='https://jeffreych6.github.io/income_tax_by_state/'>Income Tax by State</a>
                                <a href='https://rarebnb.onrender.com/'>RareBnb</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="about-us-person" id="Ishtahad">
                    <img id='profile-pic-about-us' src={Ishtahad} />
                    <div className='about-us-info'>
                        <p className='about-us-name'>Ishtahad Ahmed</p>
                        <p className='about-us-title'>Frontend Lead</p>
                        <p>I'm Ishtahad, etc.</p>
                        <div className="Job-Links">
                            <a href='https://github.com/IshsGit/'><img className="Github" src={Github} /></a>
                            <a href='https://www.linkedin.com/'><img className="LinkedIn" src={LinkedIn} /></a>
                            <div id='project-links'>
                                <p>Other projects:</p>
                                <a href='https://ishsgit.github.io/FindYourKetoRedux/'>Find Your Keto</a>
                                <a href='https://amazon-clone-uls3.onrender.com/'>Amazish</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="about-us-person" id="Daniel">
                    <img id='profile-pic-about-us' src={Daniel} />
                    <div className='about-us-info'>
                        <p className='about-us-name'>Daniel Kalla</p>
                        <p className='about-us-title'>Backend Lead</p>
                        <p>I'm Daniel, etc.</p>
                        <div className="Job-Links">
                            <a href='https://github.com/dtkalla'><img className="Github" src={Github} /></a>
                            <a href='https://www.linkedin.com/in/daniel-kalla-496aa7234/'><img className="LinkedIn" src={LinkedIn} /></a>
                            <div id='project-links'>
                                <p>Other projects:</p>
                                <a href='https://dtkalla.github.io/JavaScript-Project-Disease-Tracker/'>Disease Tracker</a>
                                <a href='https://waterbnb.onrender.com/'>WaterBnb</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="about-us-person" id="Qiao">
                    <img id='profile-pic-about-us' src={Qiao} />
                    <div className='about-us-info'>
                        <p className='about-us-name'>Qiao Yang Han</p>
                        <p className='about-us-title'>Flex</p>
                        <p>I'm Qiao, etc.</p>
                        <div className="Job-Links">
                            <a href='https://github.com/qyhAppAcademy'><img className="Github" src={Github} /></a>
                            <a href='https://www.linkedin.com/in/qiao-yang-han-367590257/'><img className="LinkedIn" src={LinkedIn} /></a>
                            <div id='project-links'>
                                <p>Other projects:</p>
                                <a href='https://qyhappacademy.github.io/portugal_trade_data_visualization/'>Portugal Trade Data Visualization</a>
                                <a href='https://qelp.onrender.com/'>Qelp</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </ul>
        </div>        
    )
}

export default AboutUs
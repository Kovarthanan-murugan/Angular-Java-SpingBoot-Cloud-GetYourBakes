import './otherprojects.css'
import github from '../../assets/github.png'
import linkedInIcon from '../../assets/linkedin.png'
import kova from '../../assets/kovarthanan_photo.png'

export default function Otherprojects(){
    return(
        <div className="bakesContainer">
            <h1 className='updatingSoon'>Updating Soon....</h1>
                <div className="footer">
                <a href="https://kovarthanan-murugan.github.io/portfolio/about.html" target="_black"><img className = "kovaIcon" src={kova}></img></a>
                <a href="https://github.com/Kovarthanan-murugan" target="_black"><img className = "githubIcon" src={github}></img></a>
                <a href="https://www.linkedin.com/in/kovarthanan-murugan-8530511b2/" target="_black"><img className="linkedinIcon" src={linkedInIcon}></img></a>
            </div>
        </div>

    )
}
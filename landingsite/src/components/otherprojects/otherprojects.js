import './otherprojects.css'
import github from '../../assets/github.png'
import linkedInIcon from '../../assets/linkedin.png'

export default function Otherprojects(){
    return(
        <div className="bakesContainer">
            <h1 className='updatingSoon'>Updating Soon....</h1>
                <div className="footer">
                <a href="https://github.com/Kovarthanan-murugan" target="_black"><img className = "githubIcon" src={github}></img></a>
                <a href="https://www.linkedin.com/in/kovarthanan-murugan-8530511b2/" target="_black"><img className="linkedinIcon" src={linkedInIcon}></img></a>
            </div>
        </div>

    )
}
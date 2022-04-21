import "./home.css"
import home_heading_img from "../../assets/imgs/Header_img.png"
import home_section_img_1 from "../../assets/imgs/home_section_img_1.png"
import home_section_img_2 from "../../assets/imgs/home_section_img_2.png"
import home_section_img_3 from "../../assets/imgs/home_section_img_3.png"

const Home = () => {
    return(
        <div className="home">

            <div className="heading">
                <div className="heading_texts">
                    <h1>Make Everyday Productive, with Clear and Pre-defined Goals.</h1>
                    <p>Get productive with our task manager to set pre-defined goals as well as find paths for your career for a seamless and fulfilled career. </p>
                </div>
                <img src={home_heading_img} alt="home_heading_img" width="100%"/>
            </div>

            <div className="sections">
                <div className="section">
                    <img src={home_section_img_1} alt="home_section_img_1"/>
                    <div className="home_section_text">
                        <h1>Organize your tasks <span>Effectively</span></h1>
                        <p>Using our drag and drop effects, You can organize your tasks based on the way you want them accomplished.</p>
                    </div>
                </div>
            </div>

            <div className="sections">
                <div className="section">
                    <div className="home_section_text">
                        <h1>Achieve <span>Discipline</span> by setting time for each task</h1>
                        <p>Set time to complete each tasks, working towards beating the time set instead of being stuck.</p>
                    </div>
                    <img src={home_section_img_2} alt="home_section_img_2"/>
                </div>
            </div>

            <div className="sections">
                <div className="section">
                    <img src={home_section_img_3} alt="home_section_img_3"/>
                    <div className="home_section_text">
                        <h1>Follow your <span>Progress</span> as you finish tasks</h1>
                        <p>With charts showcasing percentages of your completed tasks against unfinished tasks, will help you gain efficiency.</p>
                    </div>
                </div>
            </div>

            <div className="login">
                <a href="/login">Get Started now</a>
            </div>

        </div>
    )
}

export default Home
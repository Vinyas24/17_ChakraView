import './Team.css';
import Footer from './Footer';
import yogin from '../assets/team/yogin.png';
import samarth from '../assets/team/samarth.png';
import sujan from '../assets/team/sujan.png';
import vinyas from '../assets/team/vinyas.png';

import link from '../assets/socials/linkedin.png';
import git from '../assets/socials/github.png';
import insta from '../assets/socials/instagram.png';
import tweet from '../assets/socials/twitter.png';

const teamMembers = [
    {
        img: yogin,
        name: "Yogin Kumar",
        usn: "4MW22CS179",
        role: "Team Lead",
        description: "Tech enthusiast passionate about coding and development. Enjoys reading novels and following cricket during his free time.",
        // socials: [
        //     { icon: link, alt: "LinkedIn", url: "linkedin.com/in/yogin-kumar-9a7a6a372" },
        //     { icon: insta, alt: "Instagram", url: "https://instagram.com/vijay_netekal_287" },
        //     { icon: tweet, alt: "Twitter", url: "https://twitter.com/Netekal1Vijay" }
        // ]
    },
    {
        img: samarth,
        name: "Samarth",
        usn: "4MW22CS133",
        role: "Member",
        description: "Enthusiastic about competitive programming and AI. Enjoys exploring new tech trends and building side projects in Python and JavaScript.",
        // socials: [
        //     { icon: link, alt: "LinkedIn", url: "https://www.linkedin.com/in/samarthgs" },
        //     { icon: insta, alt: "Instagram", url: "https://instagram.com/samarth" },
        //     { icon: tweet, alt: "Twitter", url: "https://twitter.com/samarth" }
        // ]
    },
    {
        img: sujan,
        name: "Sujan Kumar K",
        usn: "4MW22CS164",
        role: "Member",
        description: "Full-stack web developer who enjoys working on MERN projects. Loves coding, designing user interfaces, and building projects.",
        // socials: [
        //     { icon: git, alt: "GitHub", url: "https://github.com/Suja2004" },
        //     { icon: link, alt: "LinkedIn", url: "https://www.linkedin.com/in/sujan-kumar-k164" },
        //     { icon: tweet, alt: "Twitter", url: "https://x.com/SujaK2004" }
        // ]
    },
    {
        img: vinyas,
        name: "Vinyas",
        usn: "4MW22CS183",
        role: "Member",
        description: " Web developer who enjoys working on MERN projects. Loves coding, designing UI&UX.",
        // socials: [
        //     { icon: link, alt: "LinkedIn", url: "linkedin.com/in/v1nyas" },
        //     { icon: insta, alt: "Instagram", url: "https://instagram.com/vinyas_24" },
        //     { icon: tweet, alt: "Twitter", url: "https://twitter.com/VINYAS_24" }
        // ]
    }
];


function Team() {
    return (
        <>
            <div id='team' className='team section'>
                <div className="slider" style={{ "--quantity": teamMembers.length }}>
                    {teamMembers.map((member, index) => (
                        <div className="item" style={{ "--position": index + 1 }} key={member.usn}>
                            <div className="content">
                                <img src={member.img} alt={member.name} />
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <p>SMVITM</p>
                                <div className="info">
                                    <p>{member.description}  </p>
{/*                                     <div className="socials">
                                        {member.socials.map((social, i) => (
                                            <a href={social.url} key={i} target="_blank" rel="noopener noreferrer">
                                                <img src={social.icon} alt={social.alt} />
                                            </a>
                                        ))}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Team;

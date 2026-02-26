const SectionTitle = ({titlefirst,titleSec, className})=> {
    return ( 
        <div className={`section-title cta-title mb-35 ${className}`}>
            <h2>{titlefirst} <span>{titleSec}</span></h2>
            <img src="/brushstroke-dash.png" alt="circle left" />
        </div>
     );
}

export default SectionTitle;
import ServiceItem from './service';

const services = [
    {
        icon: 'flaticon-degrees',
        title: 'Live Streaming',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse .'
    },
    {
        icon: 'flaticon-archery',
        title: 'Gaming News',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse .'
    },
    {
        icon: 'flaticon-competition',
        title: 'Composition',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse .'
    },
]

const Services = () => {
    return (
        <section id="services" className="services-area what-story pb-90 fix">
            <div className="container">
                <div className="row">
                    {
                        services.map((service, index) => {
                            return <ServiceItem
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description} />
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Services;
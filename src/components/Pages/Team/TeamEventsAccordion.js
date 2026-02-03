import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'pixel-retroui';
import { eventTeams } from './teamData';
import EventTeamContent from './EventTeamContent';

const TeamEventsAccordion = () => {
  return (
    <div className="team-accordion-wrap">
      <Accordion
        collapsible={true}
        bg="#14142A"
        textColor="#FFF4C7"
        borderColor="#ffc010"
        shadowColor="#280F0E"
        className="team-retro-accordion"
      >
        {eventTeams.map((event) => (
          <AccordionItem key={event.id} value={event.id}>
            <AccordionTrigger>{event.eventName}</AccordionTrigger>
            <AccordionContent>
              <EventTeamContent
                coordinators={event.coordinators}
                volunteers={event.volunteers}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TeamEventsAccordion;

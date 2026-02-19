import React from "react";
import EventDetail from "../EventDetail";
import techHunt from "../../../../assets/img/PIXELATED EVENT MASCOTS/TECH HUNT.png";
import techHuntBanner from "../../../../assets/img/event_specific_pictures/techHunt/techhunt_banner.png";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const TechHuntEvent = () => {
  const eventData = {
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02954.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02955.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02969.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02970.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02971.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02972.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02974.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Tech Hunt",
    logo: techHunt,
    category: "Brain Teaser",
    breadcrumbBg: techHuntBanner,
    description:
      "Tech Hunt is an exciting treasure hunt meets tech quiz event. Navigate through campus following cryptic clues, solve technical riddles, and crack codes to reach the final destination. This event combines physical activity with mental challenges, testing both your technical knowledge and problem-solving abilities in a fun, engaging format.",
    teamSize: "3-5 Members",
    entryFee: "₹200 per team",
    duration: "3 Hours",
    venue: "Campus-wide",
        faqs: [
          {
            q: "What is the team size?",
            a: `Each team must consist of 3 to 5 members.`
          },
          {
            q: "Will answer sheets be provided?",
            a: `Yes, all required question papers and answer sheets will be provided by the committee.`
          },
          {
            q: "How many rounds are there in the event?",
            a: `There are three rounds:\nRound 1: Time Warp Trials (Pen & Paper)\nRound 2: Visual Vault (Visual-based test)\nFinal Round: Retro Run (Treasure Hunt)`
          },
          {
            q: "What is Round 1 (Time Warp Trials)?",
            a: `It is a pen-and-paper round with 10–15 questions to be solved in 30 minutes.`
          },
          {
            q: "How will teams be evaluated in Round 1 and Round 2?",
            a: `Evaluation is based on:\nTotal marks\nIf tie → Submission time\nIf still tie → Number of star-marked questions solved.`
          },
          {
            q: "What is Round 2 (Visual Vault)?",
            a: `It is a visual-based exam where teams will be shown visual questions/footage on a screen and must interpret and write the answers on the provided answer sheet within 40 minutes.`
          },
          {
            q: "What kind of visuals will be shown in Round 2?",
            a: `The visuals may represent:\nA concept\nA situation\nA process\nA clue or hidden meaning\nA technical or logical idea.`
          },
          {
            q: "What is the Final Round (Retro Run)?",
            a: `It is a treasure hunt where teams solve riddles and play different games to reach different locations and clear multiple stages with challenges.`
          },
          {
            q: "How is the winner decided in the final round?",
            a: `The team that solves the final clue and reaches the treasure in the least time wins.`
          },
          {
            q: "Are mobile phones or electronic devices allowed?",
            a: `No, use of mobile phones or any electronic devices during the rounds is strictly prohibited.`
          },
          {
            q: "What happens if a team is caught using unfair means?",
            a: `The entire team will be immediately disqualified. No appeals will be entertained.`
          },
          {
            q: "Is it compulsory for all team members to be present?",
            a: `Yes, all team members must report before the round starts, otherwise the team may be disqualified.`
          },
          {
            q: "Whom should we contact for queries?",
            a: `You can contact the Student Coordinators mentioned in the rulebook.`
          }
        ],
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "Teams must have 3-5 members",
      "All team members must stay together",
      "Use of mobile phones only for official app",
      "Damaging property will lead to disqualification",
      "Time penalties for wrong submissions",
      "Follow campus rules and regulations",
      "First team to complete all checkpoints wins",
      "Respect other teams and participants",
    ],
    prizes: [
      { position: "1st Prize", amount: "₹15,000" },
      { position: "2nd Prize", amount: "₹10,000" },
      { position: "3rd Prize", amount: "₹6,000" },
    ],
    contact: [
      {
        name: "Hunt Master",
        phone: "+91 98765 43218",
        email: "techhunt@techstorm.com",
      },
      {
        name: "Support Team",
        phone: "+91 98765 43219",
        email: "hunt@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default TechHuntEvent;

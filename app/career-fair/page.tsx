import Image from "next/image";
import Link from "next/link";

function CareerFair() { 
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          2024 Data Science UCSB Career Fair
        </h1>
        
        <p>
        Thank you for considering to attend our annual virtual Data Science Career Fair on October 25th, 2024 from 10 AM to 4 PM. As the most active STEM club on campus with over 500 registered members and 200 career fair attendees as of last year, we are confident that this fair will provide an excellent opportunity for company representatives to engage with talented students interested in data science!
        <br></br> <br></br>
        After registering on Eventbrite, you can expect to hear back from us within a week regarding the next steps. In the follow-up email, we will provide all the necessary information for company representatives to select the number of representatives you would like to bring and your available time frames. Please note that you are allowed to change your selected timeslots and the number of representatives attending until 11:59 PM on September 27th, the registration deadline. The actual event will be held completely on Zoom.

        <br></br> <br></br>
        To secure a spot at our virtual career fair, please choose one of the following partnership packages:
        <br></br> <br></br>
        <b>IMPORTANT: All purchases in the month of July will have a $200 discount!</b>
        <br></br> <br></br>
        NOTE: No refunds after September 27th!
        <br></br> <br></br>
        Bronze $100 (+$200 entrance fee): Includes 1 on 1s with students, the opportunity to bring up to 2 representatives, resume booklet, and logo exposure on our website, 2024-2025 t-shirts, Instagram, and LinkedIn page
        <br></br> <br></br>


        Silver $300 (+$200 entrance fee): Includes 1 on 1s with students, an info session, the opportunity to bring up to 4 representatives, resume booklet, and logo exposure on our website, 2024-2025 t-shirts, Instagram, and LinkedIn page
        <br></br> <br></br>


        Gold $500 (+$200 entrance fee): Includes 1 on 1s with students, 2 info sessions, the opportunity to bring up to 6 representatives, option to select specific students for 1:1 sessions, resume booklet, and logo exposure on our website, 2024-2025 t-shirts, Instagram, and LinkedIn page
        <br></br> <br></br>


        Platinum $500+ (+$200 entrance fee): Please contact us if you would like to discuss additional perks and negotiations.
        <br></br> <br></br>
        
        <Link href="https://www.eventbrite.com/e/2024-data-science-ucsb-career-fair-tickets-934194068607?aff=oddtdtcreator" className="font-medium text-gray-900 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">Register Now</Link>
        <br></br> <br></br>
        
        Please contact datascience.ucsb@gmail.com if there are any questions or concerns.
        </p>
      </div>
    );    
}

export default CareerFair;
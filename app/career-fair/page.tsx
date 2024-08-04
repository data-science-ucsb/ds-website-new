import Image from "next/image";
import Link from "next/link";

function CareerFair() { 
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          2024 Data Science UCSB Career Fair
        </h1>

        <div className="flex justify-center">
          <Image 
            src="/images/careerfair24/2024-career-fair-logo.png"
            alt="2024 Data Science UCSB Career Fair"
            width={600}
            height={400}
          />
        </div>
        
        <p>
        Thank you for considering to attend our annual virtual Data Science Career Fair on October 25th, 2024 from 10 AM to 4 PM. As the most active STEM club on campus with over 500 registered members and 200 career fair attendees as of last year, we are confident that this fair will provide an excellent opportunity for company representatives to engage with talented students interested in data science!
        <br></br> <br></br>
        After registering on Eventbrite, you can expect to hear back from us within a week regarding the next steps. In the follow-up email, we will provide all the necessary information for company representatives to select the number of representatives you would like to bring and your available time frames. Please note that you are allowed to change your selected timeslots and the number of representatives attending until 11:59 PM on September 27th, the registration deadline. The actual event will be held completely on Zoom.

        <br/> <br></br>
        <Link target="_blank" href="https://www.eventbrite.com/e/2024-data-science-ucsb-career-fair-tickets-934194068607?aff=oddtdtcreator" className="font-medium text-gray-900 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">Register Now</Link>
        <br></br> <br></br>
        
        Please contact datascience.ucsb@gmail.com if there are any questions or concerns.
        </p>
      </div>
    );    
}

export default CareerFair;
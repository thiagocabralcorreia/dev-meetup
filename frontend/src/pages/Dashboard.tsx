import EventCard from "../components/EventCard";

const Dashboard = () => {
  return (
    <div className="header-height min-h-screen pb-5">
      <div
        className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1400px]:lg:grid-cols-3
      max-sm:m-2 max-sm:mt-12 m-16 gap-x-8"
      >
        <EventCard
          eventId="Brazucas"
          userId="Test"
          category="Front-end"
          image="https://as2.ftcdn.net/v2/jpg/01/71/57/89/1000_F_171578974_eNhE6sEpc6jsK6Py7IxhTbIZZQ7878Wb.jpg"
          title="Brazuka II"
          description="Segundo encontro de desenvolvedores brasileiros que moram na Inglaterra."
          date="21/02/2023"
          place="London, England - UK"
          price={15}
        />
        <EventCard
          eventId="Brazucas"
          userId="Test"
          category="Front-end"
          image="https://as2.ftcdn.net/v2/jpg/01/71/57/89/1000_F_171578974_eNhE6sEpc6jsK6Py7IxhTbIZZQ7878Wb.jpg"
          title="Brazuka II"
          description="Segundo encontro de desenvolvedores brasileiros que moram na Inglaterra."
          date="21/02/2023"
          place="London, England - UK"
          price={15}
        />
        <EventCard
          eventId="Brazucas"
          userId="Test"
          category="Front-end"
          image="https://as2.ftcdn.net/v2/jpg/01/71/57/89/1000_F_171578974_eNhE6sEpc6jsK6Py7IxhTbIZZQ7878Wb.jpg"
          title="Brazuka II"
          description="Segundo encontro de desenvolvedores brasileiros que moram na Inglaterra."
          date="21/02/2023"
          place="London, England - UK"
          price={15}
        />
        <EventCard
          eventId="Brazucas"
          userId="Test"
          category="Front-end"
          image="https://as2.ftcdn.net/v2/jpg/01/71/57/89/1000_F_171578974_eNhE6sEpc6jsK6Py7IxhTbIZZQ7878Wb.jpg"
          title="Brazuka II"
          description="Segundo encontro de desenvolvedores brasileiros que moram na Inglaterra."
          date="21/02/2023"
          place="London, England - UK"
          price={15}
        />
        <EventCard
          eventId="Brazucas"
          userId="Test"
          category="Front-end"
          image="https://as2.ftcdn.net/v2/jpg/01/71/57/89/1000_F_171578974_eNhE6sEpc6jsK6Py7IxhTbIZZQ7878Wb.jpg"
          title="Brazuka II"
          description="Segundo encontro de desenvolvedores brasileiros que moram na Inglaterra."
          date="21/02/2023"
          place="London, England - UK"
          price={15}
        />
      </div>
    </div>
  );
};

export default Dashboard;

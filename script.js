fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const timenavs = document.querySelectorAll(".timenav-tab");
    const activities = document.querySelectorAll(".activity");

    timenavs.forEach((tab) => {
      tab.addEventListener("click", () => {
        timenavs.forEach((t) => t.classList.remove("timenav-tab-active"));
        tab.classList.add("timenav-tab-active");

        const timeframe = tab.textContent.toLowerCase();

        activities.forEach((activity, i) => {
          const activityData = data[i];
          const currentHours = activityData.timeframes[timeframe].current;
          const previousHours = activityData.timeframes[timeframe].previous;

          activity.querySelector(
            ".activity-current"
          ).textContent = `${currentHours}hrs`;

          const previousText = activity.querySelector(".activity-previous");

          const timeframeTexts = {
            daily: "Yesterday",
            weekly: "Last Week",
            monthly: "Last Month",
          };

          previousText.textContent = `${timeframeTexts[timeframe]} - ${previousHours}hrs`;
        });
      });
    });
    timenavs[0].click();
  })
  .catch((err) => {
    console.error("Error:", err);
  });

function slideInRight(element) {
    element.classList.add('slide-in-right');
  }
  
  // Create an Intersection Observer
  const observerRight = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.remove('animate-slide-in-right');
          slideInRight(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Trigger when at least 10% of the target is visible
  });
  

  function slideInLeft(element) {
    element.classList.add('slide-in-left');
  }
  
  // Create an Intersection Observer
  const observerLeft = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.remove('animate-slide-in-left');
          slideInLeft(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Trigger when at least 10% of the target is visible
  });
  
  // Select all elements you want to animate
  const elementsToAnimateLeft = document.querySelectorAll('.animate-slide-in-left');
  
  // Observe each element
  elementsToAnimateLeft.forEach(element => {
    observerLeft.observe(element);
  });

   // Select all elements you want to animate
   const elementsToAnimateRight = document.querySelectorAll('.animate-slide-in-right');
  
   // Observe each element
   elementsToAnimateRight.forEach(element => {
     observerRight.observe(element);
   });
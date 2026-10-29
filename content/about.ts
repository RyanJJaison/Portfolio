// "Who I am" on the home page, in Ryan's own words.
export type AboutSection = { heading: string; paragraphs: string[] | null; prompt: string };

export const about = {
  title: "Who I am",
  sections: [
    {
      heading: "Where it started",
      prompt: "How you got into computing and AI.",
      paragraphs: [
      "My fascination with technology began long before I knew what to call it. As a kid, I was endlessly curious about how computers worked and how the internet connected the world together. I wanted to know what happened behind the screen. That curiosity never really went away; it just found new directions.",
      "Before college, I was already reading and learning about AI and how it was reshaping the world around us. That early interest only grew stronger, and it eventually pulled me toward computer science, where I could go beyond asking how things work and start building them. Today, that blend of curiosity and code is what drives the way I build and think.",
    ],
    },
    {
      heading: "What I build",
      prompt: "The kind of problems you like solving, and why.",
      paragraphs: [
      "I build AI systems that actually work outside the notebook. That usually means machine learning and deep learning models, from neural networks to graph-based approaches, wrapped in clean backends and APIs so they can be used by real people, not just admired in a demo.",
      "My work spans the full stretch between an idea and something usable. On the modeling side, I work with PyTorch to build and train neural networks, including graph neural networks for data where the relationships matter as much as the records themselves. On the engineering side, I use Python with Flask and FastAPI to turn trained models into services, and I lean on AWS tools like SageMaker and Bedrock when a project needs to scale or tap into foundation models. Generative AI and NLP sit alongside all of this, and I like exploring how they can make tools more useful, not just more impressive.",
      "I’m drawn to messy, real-world problems: data with hidden structure, patterns that aren’t obvious, and models that need to earn their results. That’s why I’m picky about evaluation. I split data by time instead of at random when the problem demands it, check for leakage before I celebrate a good score, and compare against honest baselines. When a model’s performance drops, I want to know whether it’s overfitting, drift, or a flaw in my own setup, and I’d rather spend a day finding out than ship a number I can’t explain.",
      "I also write things down. Clear documentation, reproducible runs, and an honest list of limitations are part of how I build, because a system someone else can’t understand or trust isn’t really finished.",
      "Generative AI, graph neural networks, and cloud-powered AI are where I spend most of my time. Different problems, same itch: figure out how it works, then make it work better.",
    ],
    },
    {
      heading: "Where I'm going",
      prompt: "What you want to be doing in a few years.",
      paragraphs: [
      "I’m not done learning how things work, and the next chapter is about going deeper.",
      "I’m diving further into AI and machine learning, including the math behind it all: the linear algebra, probability, statistics and optimization that make learning possible. It’s easy to get a model running with a library and a few lines of code, but understanding what’s happening underneath helps me judge why a model behaves the way it does and what to do when it doesn’t.",
      "At the same time, I’m working on the engineering side of machine learning. I’m learning Docker and Kubernetes so the models I build can be packaged, deployed and scaled instead of living on my laptop. I’m also preparing for the AWS Certified Machine Learning Engineer – Associate (MLA-C01), which takes me from building models to deploying, monitoring and maintaining them in production on AWS.",
      "Alongside all of this, I’m researching predictive models: how they’re built, how they’re evaluated, and why some hold up in the real world while others quietly fall apart.",
      "The goal is simple: become an engineer who can take an AI system from the math, through the model, all the way to deployment, and who can explain every step along the way.",
    ],
    },
  ] as AboutSection[],
  // Verified facts shown beside the essay.
  facts: [
    { label: "Based in", value: "Bangalore, India" },
    { label: "Studying", value: "B.Tech, Artificial Intelligence · Christ University · 2nd year" },
    { label: "CGPA", value: "3.95 / 4.00" },
    { label: "Certified", value: "AWS Certified AI Practitioner" },
    { label: "Route", value: "Pala → Kochi → Bangalore" },
    { label: "Languages", value: "English (C2), Malayalam (native)" },
  ],
};

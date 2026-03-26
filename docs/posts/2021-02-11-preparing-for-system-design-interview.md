---
title: Prepare for system design interviews
date: 2021-02-11
tags: ["interview", "system-design"]
excerpt: Many people are afraid of system design interviews as there's normally no certain pattern to prepare for and the question is open-ended, unpredictable, and quite flexible. Therefore, there's usually no standard or correct answer which makes the preparation process even harder. This post will cover how you prepare for system design interviews and what interviewers expect from you.
published: true
---

Many people are afraid of system design interviews as normally there's no certain pattern to prepare for and questions are open-ended, unpredictable, and quite flexible. Therefore, it's hard to find a correct answer which makes the preparation process even harder.

In this post, I'll cover some tips that would help you to prepare and potentially impress your interviewers.

#### Clarify questions

Usually, the question is given without detailed information and this is intended in order to test the ability to work with ambiguity. You should ask for further clarifications to avoid solving a wrong problem. Sometimes, it's OK to give an common-sense assumption; however make sure to inform the interviewer that you're giving an assumption in order to solve the problem.

#### Give an outline

Like writing engineering specifications, I find it useful to have an outline of the design. Not only does it help you to structure your thought, but it also helps to align the expectation with the interviewer. In an interview, I usually recommend this below structure:
- High-level architecture
- Data model
- Choice of techniques & trade-offs
- Scalability concerns
- Availability concerns
- Security concerns

Starting with high-level architecture will give an overview of your design. It then will allow the interviewer to follow your idea easier. And then, choice of technologies & trade-offs is the place to show your experience and your knowledge of different types of technologies. Security concerns is not less important at all especially when people are more concerned about their data privacy these days. A hack or a breach will not only be costly in terms of economic but also company reputation.

If you have extra time, it's also good to talk about:
- Fault tolerance
- Deployment
- Rollout
- Configurations

#### Start with a simple solution

In my experience, lots of candidates start with a sophisticated solution which ended up confusing themselves let alone the interviewer. They usually struggles to implement it and to explain the solution to the interviewer. Therefore, I always keep reminding my candidates to start with a simple approach first and then expand to solve a complex problem. This approach is actually practical when we start with MVP and then adding more functionalities later.

Just to be clear, I don't suggest ending with a simple solution as the world problem is usually more complicated due to business constraints. However, evolving from a simple solution to a more complex one could demonstrate the critical thinking skill much better. 

#### Give reasons always

One mistake that I usually see from candidates is to give a technical choice without giving any specific reason. An example is that one adds a cache and saying that it's used for caching data without considering whether there is a performance benefit or experience impact. As a result, this won't help the interviewer to address your experience nor knowledge on the given stack. Furthermore, it may create a bad impression that you're naming the stack and just copying the answer from somewhere else.

#### Consider trade-off

Selecting the right stack or architecture at the beginning is good but it's always better if you can provide the comparison with any alternative solution and the trade-off. I believe this should show off your experience and deep understanding of the stack and increase your score significantly. For example, instead of just saying that using a queue for an asynchronous job, you can compare it with a synchronous solution and share the compromise that has to be made.

Those are some tips that I find useful. Of course, it's important to have a wide range of knowledge about different types of technology stacks. Having research about the company in advance is also good to understand the tech-stack. Happy practicing and good luck with your interview!

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Globalization;

namespace POSHardwareCtrl
{
    public class POSHardwareCtrlService : IPOSHardwareCtrlService
    {
        //static int _firstYear = 2001;
        //public IssuesCollection GetAllIssues()
        //{
        //    IssuesCollection allIssues = new IssuesCollection();
        //    int years = DateTime.Now.AddYears(1).Year - _firstYear;
        //    for (int i = 0; i < years; i++)
        //    {
        //        allIssues.Add((_firstYear + i).ToString());
        //    }
        //    return allIssues;

        //}
        //public IssuesData GetIssuesByYear(string year)
        //{
        //    IssuesData issue = new IssuesData { Year = year, Issues = new MonthInfo() };
        //    Calendar c = new GregorianCalendar();
        //    CultureInfo ci = CultureInfo.CurrentCulture;

        //    int mnths = c.GetMonthsInYear(Int32.Parse(year));
        //    for (int j = 0; j < mnths; j++)
        //    {
        //        issue.Issues.Add(ci.DateTimeFormat.MonthNames[j]);
        //    }
        //    return issue;

#region IPOSHardwareCtrlService Members

        public SlipData SampleSlip()
        {
            SlipData data = new SlipData();
            data.id = "9876";
            data.type = "ticket";
            data.datetime = DateTime.Now.ToString();

            contactInfo biz = new contactInfo();
            biz.name = "J's Cleaners";
            biz.addr = "205 S San Mateo Dr, San Mateo, CA 94401";
            biz.webaddr = "http://jsdryclean.com";
            biz.phone = "650.343.2060";
            data.bizInfo = biz;

            contactInfo customer = new contactInfo();
            customer.name = "J's Cleaners";
            customer.phone = "650.343.2060";
            data.custInfo = customer;

            LineItemsCollection items = new LineItemsCollection()
            {
                new LineItem {quant = 1, desc = "dc coat", comment = "grey", itemPrice = 14.0F },
                new LineItem {quant = 2, desc = "dc shirt", comment = "blue stripes, red silk", itemPrice = 6.0F }
            };
            data.items = items;

            return data;
        }

        public SlipData  PrintSlip(SlipData data)
        {
            //do pos stuff

            return data;
        }

#endregion
}



        //#region IIssues Members


        //public Articles GetIssue(string year, string issue)
        //{
        //    var ret = from a in _articles
        //              where a.Year == year && a.Issue == issue
        //              select a;
        //    Articles temp = new Articles();
        //    temp.AddRange(ret);
        //    return temp;
        //}
        //static Articles _articles = InitArticles();

        //private static Articles InitArticles()
        //{
        //    Articles ret = new Articles();
        //    ret.Add(new Article
        //    {
        //        Title = "SAAS: Connect Enterprise Apps with Hosted BizTalk Services ",
        //        Content = "In this article we introduce you to BizTalk Services, new technology that offers the Enterprise Service Bus features of BizTalk Server as a hosted service.",
        //        Author = "Jon Flanders and Aaron Skonnard",
        //        Id = "1",
        //        Year  = "2008",
        //        Issue = "June"
        //    });


        //    ret.Add(new Article
        //    {
        //        Title = "Concurrency: Tools And Techniques to Identify Concurrency Issues",
        //        Content = "Efficient parallel applications aren’t born by merely running an old app on a parallel processor machine. Tuning needs to be done if you’re to gain maximum benefit.",
        //        Author = "Rahul V. Patil and Boby George",
        //        Id = "2",
        //        Year = "2008",
        //        Issue = "June"
        //    });

        //    ret.Add(new Article
        //    {
        //        Title = "Robotics: Simulating the World with Microsoft Robotics Studio",
        //        Content = "Microsoft Robotics Studio is not just for playing with robots. It also allows you to build service-based applications for a wide range of hardware devices.",
        //        Author = "Sara Morgan",
        //        Id = "3",
        //        Year = "2008",
        //        Issue = "June"
        //    });

        //    ret.Add(new Article
        //    {
        //        Title = "Form Filler: Build Workflows to Capture Data and Create Documents",
        //        Content = "Learn how to create a workflow that uses InfoPath forms and other office documents for passing data to targeted activities and for use in Office documents.",
        //        Author = "Rick Spiewak",
        //        Id = "4",
        //        Year = "2008",
        //        Issue = "June"
        //    });
        //    return ret;
        //}

        //public Article GetArticle(string year, string issue, string article)
        //{
        //    Article a = null;
        //    a = (from arts in _articles
        //         where arts.Id == article && arts.Issue == issue && arts.Year == year
        //         select arts).Single();
        //    return a;
        //}


        //public Article PrintSlip(string year, string issue, Article article)
        //{
        //    var count = (from a in _articles
        //                 where a.Year == year && a.Issue == issue
        //                 select a).Count();
        //    article.Id = (count + 1).ToString();
        //    _articles.Add(article);
        //    return article;

        //}

        //#endregion
    //}
}

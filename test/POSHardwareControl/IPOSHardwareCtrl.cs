using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;

namespace POSHardwareCtrl
{
    [ServiceContract]
    public interface IPOSHardwareCtrlService
    {
        [OperationContract]
        [WebGet(UriTemplate = "/")]
        SlipData SampleSlip();

        [OperationContract]
        [WebInvoke(UriTemplate = "/printSlip/", Method = "POST")]
        SlipData PrintSlip(SlipData data);
    }

    [DataContract(Name = "printSlip", Namespace = "")]
    public class SlipData
    {
        [DataMember(Name = "type")]
        public string type;
        [DataMember(Name = "id")]
        public string id;
        [DataMember(Name = "datetime")]
        public string datetime;

        [DataMember(Name = "businessInfo")]
        public contactInfo bizInfo;

        [DataMember(Name = "customerInfo")]
        public contactInfo custInfo;
        
        [DataMember(Name = "lineItems")]
        public LineItemsCollection items;

    }

    [DataContract(Name = "contactInfo", Namespace = "")]
    public class contactInfo
    {
        [DataMember(Name = "name")]
        public string name;
        [DataMember(Name = "address")]
        public string addr;
        [DataMember(Name = "web")]
        public string webaddr;
        [DataMember(Name = "phone")]
        public string phone;
    }
    [CollectionDataContract(Name = "lineItems", Namespace = "", ItemName = "item")]
    public class LineItemsCollection : List<LineItem>
    {
    }

    [DataContract(Name = "lineItem", Namespace = "")]
    public class LineItem
    {
        [DataMember(Name = "quantity")]
        public int quant;
        [DataMember(Name = "description")]
        public string desc;
        [DataMember(Name = "comment")]
        public string comment;
        [DataMember(Name = "perItemPrice")]
        public float itemPrice;
    }

}

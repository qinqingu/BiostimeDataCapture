<%@ Control Language="C#" AutoEventWireup="true" Inherits="EDoc2.Website.UserControls.Header" Codebehind="Header.ascx.cs" %>
<%@ Register assembly="EDoc2.Website.Core" namespace="EDoc2.Website.WebControls" tagprefix="edoc" %>
<div id="headerWrap"><div id="header"><div id="headerInner">
    <div id="logo">
        <span><edoc:SRLiteral ID="SRLiteral5" runat="server" Name="productName"></edoc:SRLiteral></span>
    </div>
    <div id="topNav">
        <div id="topGreeting" style="background: url(UserFace/userHeader.png) 55px 0px no-repeat" >
            <a runat="server" href="~/Portal/Default.aspx" target="_blank" id="portalLink" class="portal2Link" Visible="False"><edoc:SRLiteral ID="SRLiteral7" runat="server" Name="PersonalizedHomepage"></edoc:SRLiteral></a>
            <edoc:SRLiteral ID="SRLiteral4" runat="server" Name="topGreeting"></edoc:SRLiteral>
          <span id="topGreetingName" style="padding-left: 22px"><asp:Literal ID="ltlGreetingName" runat="server"></asp:Literal></span>
            <edoc:SRLiteral ID="SRLiteral6" runat="server" Name="topGreetingName"></edoc:SRLiteral>
        </div>
        <ul id="topNavMenu">
            <asp:PlaceHolder ID="plTopNewMsg" runat="server">
                <li><a href="javascript:void(0);" id="topNewMsgLink" onclick="topNewMsgLink_Click();"><edoc:SRLiteral ID="ltlNewMsg" runat="server" Name="topNewMsg"></edoc:SRLiteral></a></li>
            </asp:PlaceHolder>
            <li><a href="/JfzDataCapture/FinanceDept/Index" target="_blank">金斧子财务部合同采集工具</a></li>
            <li><a href="/JfzDataCapture/AdminDept/Index" target="_blank">金斧子行政部合同采集工具</a></li>
            <li><a href="/BiostimeDataCapture/FaArchive/Index" target="_blank">合生元财务档案报表</a></li>
            <li><a id="linkDownloadExtEditor" href="edoc2-client-controls.exe" runat="server"></a></li>
            <li><a href="javascript:void(0);" id="topPersonalInfoLink"><edoc:SRLiteral ID="SRLiteral3" runat="server" Name="topNavUserInfo"></edoc:SRLiteral></a></li>
            <li><a href="javascript:void(0);" id="aboutEdocInfoLink"><edoc:SRLiteral ID="SRLiteral2" runat="server" Name="aboutEdocInfo"></edoc:SRLiteral></a></li>
            <li><a runat="server" href="~/logout.aspx"><edoc:SRLiteral ID="SRLiteral1" runat="server" Name="topNavExit"></edoc:SRLiteral></a></li>
        </ul>
    </div>
</div></div></div>

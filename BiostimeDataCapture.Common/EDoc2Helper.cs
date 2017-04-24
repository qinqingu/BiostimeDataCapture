using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using EDoc2.ApiClientManage;
using EDoc2.ApiClientManage.Document;
using EDoc2.ApiClientManage.Meta;
using EDoc2.ApiClientManage.Organization;
using EDoc2.ApiClientManage.Upload;

namespace BiostimeDataCapture.Common
{
    public class EDoc2Helper
    {
        /// <summary>
        ///     获取Token
        /// </summary>
        /// <returns></returns>
        public static string GetAdminToken()
        {
            var organizationApiProvider = new OrganizationApiProvider();
            ResultString resultToken =
                organizationApiProvider.UserLoginImpersonate(2);
            return resultToken.ResultValue;
        }

        #region 组织架构

        /// <summary>
        ///     判断token是否在登录状态
        /// </summary>
        /// <returns></returns>
        public static bool IsLogin(string token)
        {
            var organizationApiProvider = new OrganizationApiProvider();
            return organizationApiProvider.IsLogin(token);
        }

        /// <summary>
        ///     根据token获取用户信息
        /// </summary>
        /// <returns></returns>
        public static EDocUserInfo GetUserInfoByToken(string token)
        {
            //ResultInt:Result=0成功,ResultValue:文件编号
            try
            {
                var organizationApiProvider = new OrganizationApiProvider();
                ResultEDocUserInfo result = organizationApiProvider.GetUserInfoByToken(token);
                if (result.Result != 0)
                {
                    throw new Exception("GetUserInfoByToken出错,result=" + result.Result);
                }
                return result.UserInfo;
            }
            catch (Exception ex)
            {
                throw new Exception("GetUserInfoByToken出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     获取用户组中的用户id
        /// </summary>
        /// <param name="groupId">用户组id</param>
        /// <returns></returns>
        public static IList<int> GetChildUserListInGroup(int groupId)
        {
            //ResultInt:Result=0成功,ResultValue:文件编号
            try
            {
                var organizationApiProvider = new OrganizationApiProvider();
                string token = GetAdminToken();
                ResultEDocUserInfoList result = organizationApiProvider.GetChildUserListInGroup(token, groupId);
                if (result.Result != 0)
                {
                    throw new Exception("GetChildUserListInGroup出错,result=" + result.Result);
                }
                return result.UserInfoList.Select(item => item.UserId).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("GetChildUserListInGroup出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     判断用户是否在指定用户中
        /// </summary>
        /// <param name="userIdentityId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public static bool IsUserInUserGroup(int userIdentityId, int groupId)
        {
            try
            {
                //var organizationApiProvider = new OrganizationApiProvider();
                //return organizationApiProvider.IsUserInUserGroup(userIdentityId, groupId, recursive);
                bool hasValue = false;
                IList<int> userIds = GetChildUserListInGroup(groupId);
                if (userIds.IndexOf(userIdentityId) != -1 || userIdentityId == WebConfig.Edoc2AdminUserId)
                {
                    hasValue = true;
                }
                return hasValue;
            }
            catch (Exception ex)
            {
                throw new Exception("IsUserInUserGroup Exception,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     根据部门ID获取所有子部门
        /// </summary>
        /// <param name="deptId">所在部门ID</param>
        /// <returns>所在部门ID下所有部门名称</returns>
        public static IList<string> GetChildDeptNames(int deptId)
        {
            var organizationApiProvider = new OrganizationApiProvider();
            ResultEDocDepartmentInfoList result = organizationApiProvider.GetChildDepartments(GetAdminToken(), deptId);
            if (result.Result != 0)
            {
                throw new Exception("GetChildDeptNames错误,result=" + result.Result);
            }
            if (result.DepartmentInfoList.Length == 0)
            {
                return new List<string>();
            }
            return result.DepartmentInfoList.Select(item => item.DeptName).ToList();
        }

        #endregion

        #region 文件操作

        /// <summary>
        ///     创建文件
        /// </summary>
        /// <param name="token">token凭证</param>
        /// <param name="atFolderId">文件所在文件夹id</param>
        /// <param name="uploadFileName">上传的文件名</param>
        /// <param name="stream">文件流</param>
        /// <returns>文件id</returns>
        public static int CreateFile(string token, int atFolderId, string uploadFileName, Stream stream)
        {
            //ResultInt:Result=0成功,ResultValue:文件编号
            try
            {
                uploadFileName = FormatHelper.FormatFileName(uploadFileName);
                var uploadFileApiProvider = new UploadFileApiProvider();
                ResultInt result = uploadFileApiProvider.CreateFile(token, atFolderId, uploadFileName, stream);
                if (result.Result != 0)
                {
                    throw new Exception("CreateFile出错,result=" + result.Result);
                }
                return result.ResultValue;
            }
            catch (Exception ex)
            {
                throw new Exception("CreateFile出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     创建文件
        /// </summary>
        /// <param name="targetFolderId">目标文件夹id</param>
        /// <param name="uploadFileName">文件名称</param>
        /// <param name="fileByte">文件流</param>
        /// <returns>文件id</returns>
        public static int CreateFile(int targetFolderId, string uploadFileName, byte[] fileByte)
        {
            string token = GetAdminToken();
            return CreateFile(token, targetFolderId, uploadFileName, fileByte);
        }

        /// <summary>
        ///     创建文件
        /// </summary>
        /// <param name="token">token凭证</param>
        /// <param name="targetFolderId">目标文件夹id</param>
        /// <param name="uploadFileName">文件名称</param>
        /// <param name="fileByte">文件流</param>
        /// <returns>文件id</returns>
        public static int CreateFile(string token, int targetFolderId, string uploadFileName, byte[] fileByte)
        {
            //ResultInt:Result=0成功,ResultValue:文件编号
            try
            {
                uploadFileName = FormatHelper.FormatFileName(uploadFileName);
                var uploadFileApiProvider = new UploadFileApiProvider();
                ResultInt result = uploadFileApiProvider.CreateFile(token, targetFolderId, uploadFileName, fileByte);
                if (result.Result != 0)
                {
                    throw new Exception("CreateFile出错,result=" + result.Result);
                }
                return result.ResultValue;
            }
            catch (Exception ex)
            {
                throw new Exception("CreateFile出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     移动文件
        /// </summary>
        /// <param name="targetFolderId">目标文件夹id</param>
        /// <param name="dropPerms">是否删除权限</param>
        /// <param name="fileId">文件id</param>
        /// <returns></returns>
        public static int MoveFile(int targetFolderId, bool dropPerms, int fileId)
        {
            string token = GetAdminToken();
            //ResultInt:Result=0成功,ResultValue:文件编号
            try
            {
                var documentApiProvider = new DocumentApiProvider();
                int result = documentApiProvider.MoveFileList(token, targetFolderId, dropPerms, fileId);
                if (result != 0)
                {
                    throw new Exception("MoveFile出错,result=" + result);
                }
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("MoveFile出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     发布文件主板本
        /// </summary>
        /// <param name="fileId">文件id</param>
        /// <returns></returns>
        public static int PublishFileMainVersion(int fileId)
        {
            string token = GetAdminToken();
            try
            {
                var documentApiProvider = new DocumentApiProvider();
                int result = documentApiProvider.PublishFileMainVersion(token, fileId);
                if (result != 0)
                {
                    throw new Exception("PublishFileMainVersion出错,result=" + result);
                }
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("PublishFileMainVersion出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     改变文件名
        /// </summary>
        /// <param name="fileId">文件id</param>
        /// <param name="newFileName">新文件名</param>
        /// <returns></returns>
        public static int ChanageFileName(int fileId, string newFileName)
        {
            return ChanageFileName(GetAdminToken(), fileId, newFileName);
        }

        /// <summary>
        ///     改变文件名
        /// </summary>
        /// <param name="token">token凭证</param>
        /// <param name="fileId">文件id</param>
        /// <param name="newFileName">新文件名</param>
        /// <returns></returns>
        public static int ChanageFileName(string token, int fileId, string newFileName)
        {
            //ResultInt:Result=0成功,ResultValue:文件编号
            try
            {
                var documentApiProvider = new DocumentApiProvider();
                int result = documentApiProvider.ChanageFileName(token, fileId, newFileName, string.Empty);
                if (result != 0)
                {
                    throw new Exception("ChanageFileName出错,result=" + result);
                }
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("ChanageFileName出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     获取文件名
        /// </summary>
        /// <param name="fileId">文件id</param>
        /// <returns></returns>
        public static string GetFileName(int fileId)
        {
            //ResultInt:Result=0成功,ResultValue:文件编号
            try
            {
                string token = GetAdminToken();
                var documentApiProvider = new DocumentApiProvider();
                ResultEDocFileInfo result = documentApiProvider.GetFileInfoByFileId(token, fileId);
                if (result.Result != 0)
                {
                    throw new Exception("GetFileName出错,result=" + result);
                }
                return result.FileInfo.FileName;
            }
            catch (Exception ex)
            {
                throw new Exception("GetFileName出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     给文件添加元数据
        /// </summary>
        /// <param name="fileId">文件id</param>
        /// <param name="metaTypeName">元数据名称</param>
        /// <param name="items">MetaItemInfo数组</param>
        /// <returns></returns>
        public static int AddFileMetaByMetaTypeName(int fileId, string metaTypeName, MetaItemInfo[] items)
        {
            string token = GetAdminToken();
            return AddFileMetaByMetaTypeName(token, fileId, metaTypeName, items);
        }

        /// <summary>
        ///     给文件添加元数据
        /// </summary>
        /// <param name="token">token凭证</param>
        /// <param name="fileId">文件id</param>
        /// <param name="metaTypeName">元数据名称</param>
        /// <param name="items">MetaItemInfo数组</param>
        /// <returns></returns>
        public static int AddFileMetaByMetaTypeName(string token, int fileId, string metaTypeName, MetaItemInfo[] items)
        {
            try
            {
                var meta = new MetaApiProvider();
                int result = meta.AddFileMetaByMetaTypeName(token, fileId, metaTypeName, items);
                if (result != 0)
                {
                    throw new Exception("AddFileMetaByMetaTypeName出错,result=" + result);
                }
                return result;

                //MetaItemInfo数组示例：
                //var itemInfoList = new[]
                //{
                //    new MetaItemInfo("编号", "id"),
                //    new MetaItemInfo("名称", "name")
                //};
            }
            catch (Exception ex)
            {
                throw new Exception("AddFileMetaByMetaTypeName出现异常,exMessage=" + ex.Message);
            }
        }

        #endregion

        #region 文件夹操作

        public static int GetFolder(int parentFolderId, string folderName)
        {
            string token = GetAdminToken();
            return GetFolder(token, parentFolderId, folderName);
        }

        /// <summary>
        ///     获取文件夹id,如果文件夹不存在则新建文件夹并返回文件夹id
        /// </summary>
        /// <param name="token">token凭证</param>
        /// <param name="parentFolderId">父文件夹id</param>
        /// <param name="folderName">文件夹名称</param>
        /// <returns>文件夹id</returns>
        public static int GetFolder(string token, int parentFolderId, string folderName)
        {
            try
            {
                var documentApiProvider = new DocumentApiProvider();
                folderName = folderName.Trim();
                ResultBool resultBool = documentApiProvider.ExistsFolder(token, parentFolderId, folderName);
                if (resultBool.ResultValue)
                {
                    return resultBool.Result;
                }
                ResultInt resultInt = CreateFolder(token, parentFolderId, folderName);
                return resultInt.ResultValue;
            }
            catch (Exception ex)
            {
                throw new Exception("GetFolder出现异常,exMessage=" + ex.Message);
            }
        }

        /// <summary>
        ///     新建文件夹
        /// </summary>
        /// <param name="token">token凭证</param>
        /// <param name="parentFolderId">父文件夹id</param>
        /// <param name="folderName">文件夹名称</param>
        /// <returns>ResultInt:Result=0成功,ResultValue:文件夹编号</returns>
        public static ResultInt CreateFolder(string token, int parentFolderId, string folderName)
        {
            try
            {
                var uploadFileApiProvider = new DocumentApiProvider();
                var organizationApiProvider = new OrganizationApiProvider();
                ResultEDocUserInfo eDocUserInfo = organizationApiProvider.GetUserInfoByToken(token);
                ResultInt result = uploadFileApiProvider.CreateFolder(
                    token,
                    parentFolderId,
                    folderName,
                    string.Empty,
                    0,
                    0,
                    0,
                    string.Empty,
                    string.Empty,
                    1,
                    DateTime.Now,
                    DateTime.Now,
                    eDocUserInfo.UserInfo.UserRealName,
                    eDocUserInfo.UserInfo.UserRealName
                    );
                if (result.Result != 0)
                {
                    throw new Exception("CreateFolder出错,result=" + result.Result);
                }
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("CreateFolder出现异常,exMessage=" + ex.Message);
            }
        }

        #endregion
    }
}
